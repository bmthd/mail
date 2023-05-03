const mails = [
  {
    "id": "注文受付完了",
    "category": "注文関連",
    "body": "{{name}}様\n\n{{name}}様この度は当店でのご注文、誠にありがとうございます。{{name}}様\nご注文の商品は下記の通りです。\n\n・商品名：〇〇〇〇〇\n・価格：10,000円（税込）\n\nご入金確認後、商品を発送いたしますので、今しばらくお待ちください。\n何かご不明な点がございましたら、お気軽にお問い合わせください。\n\n敬具\n〇〇株式会社"
  },
  {
    "id": "発送完了通知",
    "category": "注文関連",
    "body": "{{name}}様\n\nこの度は当店でのご注文、誠にありがとうございます。\nご注文の商品は下記の通り発送いたしました。\n\n・商品名：〇〇〇〇〇\n・価格：10,000円（税込）\n・お届け予定日：5月10日\n\n商品の受取りについて、何かご不明な点がございましたら、お気軽にお問い合わせください。\n\n敬具\n〇〇株式会社"
  },
  {
    "id": "お問い合わせ受付完了",
    "category": "お問い合わせ関連",
    "body": "{{name}}様\n\nお問い合わせいただき、誠にありがとうございます。\nご質問内容を確認後、担当者より回答させていただきます。\n回答まで今しばらくお待ちください。\n\n敬具\n〇〇株式会社"
  },
  {
    "id": "アンケート回答確認",
    "category": "お問い合わせ関連",
    "body": "{{name}}様\n\nこの度はアンケートにご協力いただき、誠にありがとうございます。\n回答内容を確認後、改善に役立てさせていただきます。\n今後ともよろしくお願いいたします。\n\n敬具\n〇〇株式会社"
  },
  {
    "id": "お詫び",
    "category": "その他",
    "body": "{{name}}様\n\n先日、お客様にご迷惑をおかけしましたこと、深くお詫び申し上げます。\n再発防止に努めてまいりますので、何卒ご理解いただけますようお願い申し上げます。\n\n敬具\n〇〇株式会社"
  },
  {
    "id": "資料送付のご案内",
    "category": "お知らせ",
    "body": "{{name}} 様、ご希望の資料を送付いたします。"
  },
  {
    "id": "ご注文ありがとうございます",
    "category": "受注確認",
    "body": "{{name}} 様、ご注文ありがとうございます。以下の内容で受け付けいたしました。"
  },
  {
    "id": "ご注文キャンセルのご連絡",
    "category": "受注確認",
    "body": "{{name}} 様、お客様のご都合により、ご注文をキャンセルさせていただきましたことをご連絡いたします。"
  },
  {
    "id": "お支払いのご案内",
    "category": "請求",
    "body": "{{name}} 様、下記の内容でご請求いたします。"
  },
  {
    "id": "ご入金確認のお願い",
    "category": "請求",
    "body": "{{name}} 様、この度はご利用いただきありがとうございました。お支払いいただいたことを確認できないため、ご入金の確認をお願いいたします。"
  },
  {
    "id": "配送予定のご案内",
    "category": "配送",
    "body": "{{name}} 様、お届け予定の商品を下記のとおり発送いたしました。"
  },
  {
    "id": "配送完了のお知らせ",
    "category": "配送",
    "body": "{{name}} 様、お届け予定の商品を無事お届けいたしました。"
  },
  {
    "id": "新規登録完了のお知らせ",
    "category": "お知らせ",
    "body": "{{name}} 様、新規登録が完了いたしました。"
  },
  {
    "id": "退会のご案内",
    "category": "お知らせ",
    "body": "{{name}} 様、この度は当サービスをご利用いただき、ありがとうございました。退会処理を承りますので、以下の手順に従って手続きを完了してください。"
  },
  {
    "id": "アカウントのロックについて",
    "category": "お知らせ",
    "body": "{{name}} 様、あなたのアカウントがロックされました。"
  }
]


let mailsByCategory = {};
// カテゴリー毎にグループ化する
mailsByCategory = mails.reduce((acc, cur) => {
  if (!acc[cur.category]) {
    acc[cur.category] = [];
  }
  acc[cur.category].push(cur);
  return acc;
}, {});

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

//　メール本文に名前を割り当てて出力する
function generate() {
  const customerName = document.getElementById("customerName").value;
  const selectedMailId = document.querySelector(
    'input[name="mailType"]:checked'
  ).value;
  const selectedMail = mails.find(
    (mail) => mail.id.toString() === selectedMailId
  );
  const body = selectedMail.body;
  document.getElementById("result").value = body.replaceAll(
    "{{name}}",
    customerName
  );
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
