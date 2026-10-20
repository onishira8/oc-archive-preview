/*
 * OC ARCHIVE — 編集用の仮データ
 * 画像は登録していません。画像を追加するときは image: "assets/xxx.webp" のように指定します。
 * 名前・紹介文・所属・施設情報はここから更新できます。
 * 情報屋の公開プロンプトは prompts 内に追加します。
 */
window.OC_DATA = {
  site: {
    name: 'OC ARCHIVE',
    project: 'THE AGENCY',
    tagline: '便利屋と、彼らを取り巻く人々の記録。',
  },
  characters: [
    { id:'ashiya', name:'アシヤ', en:'ASHIYA', group:'agency', role:'MAIN MEMBER', subtitle:'白髪の男', description:'便利屋側のキャラクター。人物設定と詳細プロフィールは今後追加予定。', image:'', attributes:['白髪','赤い瞳','褐色肌'], index:'01' },
    { id:'blackhair', name:'黒髪の男（仮）', en:'MEMBER 02', group:'agency', role:'MAIN MEMBER', subtitle:'黒髪の男', description:'名前・紹介文は仮置きです。', image:'', attributes:['黒髪','琥珀色の目'], index:'02' },
    { id:'pinkhair', name:'ピンク髪の男（仮）', en:'MEMBER 03', group:'agency', role:'MAIN MEMBER', subtitle:'ピンク髪の男', description:'名前・紹介文は仮置きです。', image:'', attributes:['ピンク髪','山羊角'], index:'03' },
    { id:'sister', name:'シスター（仮）', en:'CHURCH 01', group:'church', role:'CHURCH', subtitle:'教会組', description:'教会側のキャラクター。名前・人物設定は未登録です。', image:'', attributes:[], index:'04' },
    { id:'informant01', name:'情報屋 01（仮）', en:'INFORMANT 01', group:'informants', role:'INFORMANT', subtitle:'協力者', description:'情報屋の一人。名前・人物設定は未登録です。', image:'', attributes:[], index:'05', prompts:{ character:'', composition:'' } },
    { id:'informant02', name:'情報屋 02（仮）', en:'INFORMANT 02', group:'informants', role:'INFORMANT', subtitle:'協力者', description:'情報屋の一人。名前・人物設定は未登録です。', image:'', attributes:[], index:'06', prompts:{ character:'', composition:'' } },
  ],
  locations: [
    { id:'office', name:'便利屋の事務所', en:'THE AGENCY OFFICE', index:'001', category:'MAIN BASE', group:'agency', image:'', description:'便利屋の活動拠点。詳しい住所・建物の設定・外観や内観の画像は未登録です。', details:[['施設の種類','活動拠点'],['外観','未登録'],['内装','未登録'],['設備','未登録']], related:['ashiya','blackhair','pinkhair'] },
    { id:'church', name:'教会', en:'THE CHURCH', index:'002', category:'ASSOCIATE BASE', group:'church', image:'', description:'教会組に関連する施設。建物の正式名称や詳細は今後登録します。', details:[['施設の種類','教会'],['外観','未登録'],['内装','未登録'],['設備','未登録']], related:['sister'] }
  ],
  gallery: [
    {id:'g1',group:'agency',label:'MEMBER PORTRAIT',image:'',shape:'tall'},
    {id:'g2',group:'agency',label:'CHARACTER SCENE',image:'',shape:'short'},
    {id:'g3',group:'church',label:'CHURCH SCENE',image:'',shape:'tall'},
    {id:'g4',group:'informants',label:'INFORMANT 01',image:'',shape:'short'},
    {id:'g5',group:'agency',label:'GROUP ARTWORK',image:'',shape:'short'},
    {id:'g6',group:'informants',label:'INFORMANT 02',image:'',shape:'tall'}
  ],
  // 関係性が未確定なので、実在する設定と見なす人物間リンクは登録していません。
  relations: []
};
