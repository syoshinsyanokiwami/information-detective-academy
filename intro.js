'use strict';
const INTRO_TOPICS=[
 {name:'ロボット',tip:'顔の形、目の数、ぼうしの場所を言葉にしよう。',art:'<path d="M120 85L200 20 280 85Z" fill="#f0bb55"/><rect x="120" y="85" width="160" height="140" rx="10" fill="#b8d5d0"/><circle cx="165" cy="140" r="17" fill="white"/><circle cx="235" cy="140" r="17" fill="white"/><path d="M161 193h78" fill="none"/>'},
 {name:'家',tip:'屋根の下には何がある？ 窓とドアの場所を伝えよう。',art:'<rect x="105" y="110" width="190" height="135" fill="#f4d995"/><path d="M80 110L200 25 320 110Z" fill="#d88e79"/><rect x="135" y="140" width="45" height="40" fill="#c9e9ec"/><rect x="220" y="140" width="45" height="40" fill="#c9e9ec"/><rect x="180" y="190" width="40" height="55" fill="#b8d5d0"/>'},
 {name:'花',tip:'中心の丸と花びらの場所、くきの長さを伝えよう。',art:'<path d="M200 130V250" fill="none"/><ellipse cx="170" cy="202" rx="35" ry="15" transform="rotate(30 170 202)" fill="#b8d5a0"/><ellipse cx="230" cy="222" rx="35" ry="15" transform="rotate(-30 230 222)" fill="#b8d5a0"/>'+[0,60,120,180,240,300].map(a=>`<ellipse cx="200" cy="57" rx="24" ry="40" transform="rotate(${a} 200 112)" fill="#e8b4be"/>`).join('')+'<circle cx="200" cy="112" r="31" fill="#f0cb67"/>'},
 {name:'ロケット',tip:'長い形の中に、丸はいくつ？ 羽の向きも伝えよう。',art:'<path d="M165 210L180 265 200 240 220 265 235 210Z" fill="#efb854"/><path d="M155 155L115 225H155M245 155L285 225H245" fill="#d88e79"/><rect x="155" y="70" width="90" height="150" fill="#b8d5d0"/><path d="M155 70L200 15 245 70Z" fill="#d88e79"/><circle cx="200" cy="105" r="17" fill="white"/><circle cx="200" cy="151" r="17" fill="white"/>'},
 {name:'魚',tip:'しっぽと目は、左右のどちら？ あわの数も伝えよう。',art:'<path d="M120 140L55 85V195Z" fill="#e8ad7d"/><ellipse cx="215" cy="140" rx="110" ry="70" fill="#f0cb67"/><circle cx="278" cy="120" r="11" fill="#fff"/><path d="M305 155h16M185 120L220 140 185 160" fill="none"/><circle cx="335" cy="73" r="13" fill="#c9e9ec"/><circle cx="355" cy="35" r="9" fill="#c9e9ec"/>'},
 {name:'車',tip:'車体の上の形と、下の丸の位置を伝えよう。',art:'<path d="M105 140L145 75H245L285 140Z" fill="#b8d5d0"/><rect x="60" y="140" width="280" height="65" rx="15" fill="#d88e79"/><circle cx="120" cy="205" r="32" fill="#7d9ba3"/><circle cx="280" cy="205" r="32" fill="#7d9ba3"/><path d="M195 75V140" fill="none"/><rect x="69" y="157" width="23" height="17" fill="#f0cb67"/>'},
 {name:'ねこ',tip:'耳の形、ひげの数、顔の中の場所を伝えよう。',art:'<path d="M120 100L110 25 170 68M230 68L290 25 280 100" fill="#e8ad7d"/><ellipse cx="200" cy="143" rx="100" ry="90" fill="#f0cb67"/><circle cx="165" cy="128" r="12" fill="white"/><circle cx="235" cy="128" r="12" fill="white"/><path d="M188 158H212L200 172ZM200 172V190M110 148L60 135M110 170H55M110 190L60 205M290 148L340 135M290 170H345M290 190L340 205" fill="none"/>'},
 {name:'お城',tip:'左右の塔と真ん中の高さを比べて伝えよう。',art:'<rect x="100" y="135" width="200" height="110" fill="#b8d5d0"/><rect x="70" y="80" width="70" height="165" fill="#bacbdc"/><rect x="260" y="80" width="70" height="165" fill="#bacbdc"/><path d="M60 80L105 25 150 80ZM250 80L295 25 340 80Z" fill="#d88e79"/><path d="M175 245V195Q200 160 225 195V245Z" fill="#e8c498"/><rect x="90" y="115" width="30" height="35" fill="white"/><rect x="280" y="115" width="30" height="35" fill="white"/>'},
 {name:'アイス',tip:'丸はどこで重なる？ 下の三角の向きも伝えよう。',art:'<path d="M130 140H270L200 260Z" fill="#e8c498"/><circle cx="160" cy="120" r="44" fill="#b8d5d0"/><circle cx="240" cy="120" r="44" fill="#e8b4be"/><circle cx="200" cy="60" r="44" fill="#f0cb67"/>'},
 {name:'木とベンチ',tip:'画面全体を使い、木・ベンチ・太陽の位置を伝えよう。',art:'<rect x="91" y="110" width="28" height="135" fill="#c39a79"/><circle cx="105" cy="90" r="60" fill="#b8d5a0"/><rect x="205" y="155" width="140" height="32" fill="#e8c498"/><rect x="195" y="200" width="160" height="16" fill="#e8c498"/><path d="M215 187V245M335 187V245" fill="none"/><circle cx="310" cy="65" r="32" fill="#f0cb67"/>'}
];
let introRole=null,introTopic=0;
const introDrawings={},introHasDrawing={},introPaperDone={};
function rememberDrawing(){
 const canvas=$('#drawing');if(!canvas)return;
 const topic=Number(canvas.dataset.topic);introDrawings[topic]=canvas.toDataURL();
 if(topic===introTopic)drawing=introDrawings[topic];
}
function modelDrawing(){return `<svg class="intro-model" viewBox="0 0 400 280" role="img" aria-label="${esc(INTRO_TOPICS[introTopic].name)}のお手本"><rect width="400" height="280" fill="#fffdf5"/><g stroke="#365c65" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${INTRO_TOPICS[introTopic].art}</g></svg>`;}
function introTopicPicker(){return `<label class="topic-picker">お題の番号 <select id="introTopic">${INTRO_TOPICS.map((_,i)=>`<option value="${i}" ${i===introTopic?'selected':''}>おだい ${i+1}</option>`).join('')}</select></label><p class="small">別々の端末を使うときは、出題者と同じ番号を選んでね。</p>`;}
function introCanvas(){return `<section><canvas id="drawing" data-topic="${introTopic}" width="800" height="560" aria-label="説明を聞いて絵を描く場所。紙でも参加できます。"></canvas>${introCompared?'':`<div class="actions"><button id="clearDrawing">描き直す</button></div><label class="paper-option"><input type="checkbox" id="paperDrawing" ${introPaperDone[introTopic]?'checked':''}> 紙に 描いた</label>`}</section>`;}
function introHTML(){
 const header=stageHeader('00','お絵かき 伝言ゲーム','説明する人と、聞いて描く人。役割を選んでから始めよう。');
 if(!introRole)return `${header}<section class="case"><h2 id="activityTitle" tabindex="-1">どちらの役をする？</h2><div class="role-grid"><button data-intro-role="questioner"><span class="role-icon" aria-hidden="true">💬</span><b>出題者</b><span>お手本を 見て、言葉で 伝える。</span></button><button data-intro-role="answerer"><span class="role-icon" aria-hidden="true">✏️</span><b>回答者</b><span>お手本を 見ずに、聞いて 描く。</span></button></div><p>お題は10種類。1台を交代で使っても、別々の端末でも遊べます。</p><p class="small">出題者が画面を見るときは、回答者は見ないで待ってね。</p></section>`;
 if(introRole==='questioner')return `${header}<section class="case"><p class="tag">💬 出題者の画面</p><h2 id="activityTitle" tabindex="-1">お手本を 見て、説明しよう</h2>${introTopicPicker()}<div class="questioner-model">${introHidden?'<div class="model-cover">お手本は 隠れています。</div>':modelDrawing()}</div>${introHidden?'':`<p><b>お題 ${introTopic+1}：${INTRO_TOPICS[introTopic].name}</b></p><p>${INTRO_TOPICS[introTopic].tip}</p>`}<div class="actions"><button id="toggleModel">${introHidden?'お手本を 見る':'お手本を 隠す'}</button><button id="handoffDrawing" class="primary">お手本を 隠して、回答者へ →</button></div><p>1台を使うときは、上のボタンを押してから端末を渡そう。形・数・場所・大きさを言葉で伝えてね。</p><button id="chooseIntroRole">← 役割を 選び直す</button></section>`;
 return `${header}<section class="case"><p class="tag">✏️ 回答者の画面</p><h2 id="activityTitle" tabindex="-1">${introCompared?'お手本と 比べよう':'説明を 聞いて、描こう'}</h2>${introCompared?`<p>お題 ${introTopic+1}：${INTRO_TOPICS[introTopic].name}</p><div class="drawing-grid"><section>${modelDrawing()}<p>出題者の お手本</p></section>${introCanvas()}</div><div class="feedback">形・数・場所は 同じ？ どんな言葉で伝えると分かりやすかった？ 次は役割を交代しよう。</div><button id="nextIntroTopic" class="primary">次のお題へ・役割を交代 →</button>`:`${introTopicPicker()}<p>お手本は、答え合わせまで表示されません。聞いた説明をもとに、指や紙で描こう。</p>${introCanvas()}<div class="actions"><button id="compareDrawing" class="primary" ${introHasDrawing[introTopic]||introPaperDone[introTopic]?'':'disabled'}>描き終わった・答え合わせ</button><button id="chooseIntroRole">← 役割を 選び直す</button></div>`}<p class="small">このお絵かきは、画面を再読み込みすると消えます。上手さの採点はしません。</p></section><button class="primary" data-route="fake">次は、絵を 切り取ろう →</button>`;
}
function updateDrawingReady(){const button=$('#compareDrawing');if(button)button.disabled=!(introHasDrawing[introTopic]||introPaperDone[introTopic]);}
function setupDrawing(){
 const canvas=$('#drawing');if(!canvas)return;
 const ctx=canvas.getContext('2d');ctx.fillStyle='#fffdf5';ctx.fillRect(0,0,800,560);ctx.strokeStyle='#244f59';ctx.lineWidth=7;ctx.lineCap='round';ctx.lineJoin='round';
 drawing=introDrawings[introTopic]||null;
 if(drawing){const img=new Image();img.onload=()=>ctx.drawImage(img,0,0);img.src=drawing;}
 let active=false;
 const point=e=>{const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)*800/r.width,(e.clientY-r.top)*560/r.height];};
 canvas.onpointerdown=e=>{if(e.button!==0||introCompared)return;e.preventDefault();canvas.setPointerCapture(e.pointerId);active=true;ctx.beginPath();ctx.moveTo(...point(e));ctx.lineTo(...point(e));ctx.stroke();introHasDrawing[introTopic]=true;updateDrawingReady();};
 canvas.onpointermove=e=>{if(!active)return;e.preventDefault();ctx.lineTo(...point(e));ctx.stroke();};
 canvas.onpointerup=canvas.onpointercancel=()=>{active=false;rememberDrawing();};
}
function clearIntroDrawing(){
 drawing=null;introDrawings[introTopic]=null;introHasDrawing[introTopic]=false;
 const canvas=$('#drawing');if(canvas){const ctx=canvas.getContext('2d');ctx.fillStyle='#fffdf5';ctx.fillRect(0,0,800,560);}updateDrawingReady();
}
function setIntroRole(role){rememberDrawing();introRole=role;introHidden=false;introCompared=false;render('activityTitle');}
function setIntroTopic(index){rememberDrawing();introTopic=index;introHidden=false;introCompared=false;render('activityTitle');}
