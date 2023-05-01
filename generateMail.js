let mailsByCategory = {};
let mails;
fetch("./mails.json")
  .then((response) => response.json())
  .then((data) => {
    mails = data;
    // カテゴリー毎にグループ化する
    mailsByCategory = mails.reduce((acc, cur) => {
      if (!acc[cur.category]) {
        acc[cur.category] = [];
      }
      acc[cur.category].push(cur);
      return acc;
    }, {});
    console.log(mails)

    // グループ化したデータをHTMLに変換して出力する
    const mailTypesElement = document.getElementById("mailTypes");
    Object.keys(mailsByCategory).forEach((category) => {
      const mailsInCategory = mailsByCategory[category];
      const categoryDiv = document.createElement("div");
      const categoryLabel = document.createElement("strong");
      categoryLabel.textContent = category;
      categoryDiv.appendChild(categoryLabel);

      mailsInCategory.forEach((mail) => {
        const radioLabel = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "mailType";
        radio.value = mail.id;
        radioLabel.appendChild(radio);
        radioLabel.appendChild(document.createTextNode(mail.id));
        categoryDiv.appendChild(radioLabel);
      });

      mailTypesElement.appendChild(categoryDiv);
    });
  });

//　メール本文に名前を割り当てて出力する
function generate() {
  const customerName = document.getElementById("customerName").value;
  const selectedMailId = document.querySelector(
    'input[name="mailType"]:checked'
  ).value;
  const selectedMail = mails.find(
    (mail) => mail.id.toString() === selectedMailId
  );
  const generatedMail = selectedMail.body.replace("${name}", customerName);
  document.getElementById("result").value = generatedMail;
  document.getElementById("result-wrap").removeAttribute("hidden");
}

// コピーする
function Copy() {
  const copyTarget = document.getElementById("result");
  copyTarget.select();
  document.execCommand("Copy");
  alert("コピーしました");
  //　コピーしたら名前とテキストエリア内を空にし、結果を非表示にする
  document.getElementById("customerName").value = "";
  document.getElementById("result").value = "";
  document.getElementById("result-wrap").setAttribute("hidden", true);
}
