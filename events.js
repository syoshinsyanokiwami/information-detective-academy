document.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const d=b.dataset;
 if(d.route){go(d.route);return;}
 if(b.id==='toggleModel'){introHidden=!introHidden;introCompared=false;render('pageTitle');return;}
 if(b.id==='compareDrawing'){introCompared=true;render('pageTitle');return;}
 if(b.id==='clearDrawing'){drawing=null;const ctx=$('#drawing').getContext('2d');ctx.fillStyle='#fffdf5';ctx.fillRect(0,0,800,560);return;}
 if(d.cropStage!==undefined){cropStage=+d.cropStage;render('activityTitle');return;}
 if(d.frame!==undefined){state.crop.zoom=+d.frame;updateCrop();return;}
 if(d.headline!==undefined){state.crop.headline=+d.headline;updateCrop();return;}
 if(d.draft!==undefined){if(!caption().trim()){feedback('みだしを いれてから のこそう。');return;}state.crop.drafts[+d.draft]={zoom:state.crop.zoom,headline:caption().trim()};save();feedback(`ニュース${+d.draft+1}に のこしたよ。もう1まいは、ちがう はんいにしてみよう。`);return;}
 if(b.id==='compareCrop'){const drafts=state.crop.drafts;if(drafts.some(x=>!x)){feedback('ニュース1と2を つくってから、くらべよう。');return;}if(!drafts.some(x=>x.zoom<=5)||!drafts.some(x=>x.zoom>=95)){feedback('ごみぶくろだけの えと、ぜんたいの えを 1まいずつ つくると、くらべやすいよ。');return;}state.crop.done=true;save();nav();$('#reward').innerHTML=reward('fake');feedback('おなじ えでも、みえる はんいと みだしで いんしょうが かわるね。ぜんたいには「そうじデー」の かんばんと、ごみを ひろう ひとが いたよ。');return;}
 if(d.routePiece!==undefined&&!running){state.hunt.order.push(+d.routePiece);render('activityTitle');return;}
 if(b.id==='pathUndo'&&!running){state.hunt.order.pop();render('activityTitle');return;}
 if(b.id==='pathClear'&&!running){state.hunt.order=[];render('activityTitle');return;}
 if(b.id==='pathRun'){await runHunt();return;}
 if(d.mask){const id=d.mask;state.photo.hidden=state.photo.hidden.includes(id)?state.photo.hidden.filter(x=>x!==id):[...state.photo.hidden,id];updatePhoto();return;}
 if(b.id==='askFriend'){state.photo.asked=true;updatePhoto();return;}
 if(b.id==='photoReset'){state.photo.hidden=[];state.photo.location=true;state.photo.asked=false;updatePhoto();return;}
 if(b.id==='previewPhoto'){previewPhoto();return;}
 if(b.id==='backToPhoto'){focusAt('activityTitle');return;}
 if(d.maze!==undefined){mazeIndex=+d.maze;render('activityTitle');return;}
 if(d.wall!==undefined&&!running){const n=+d.wall;state.customWalls=state.customWalls.includes(n)?state.customWalls.filter(i=>i!==n):[...state.customWalls,n];state.mazeDone=state.mazeDone.filter(i=>i!==5);editProgram(()=>{});feedback('','mapFeedback');return;}
 if(b.id==='checkMap'){feedback(customMapReachable()?'みちが あるよ！ なかまに めいれいを くんでもらおう。':'ゴールへの みちが ふさがっているよ。かべを へらしてみよう。','mapFeedback');return;}
 if(b.id==='clearWalls'){state.customWalls=[];state.mazeDone=state.mazeDone.filter(i=>i!==5);editProgram(()=>{});feedback('','mapFeedback');return;}
 if(d.command!==undefined&&!running){selected=+d.command;drawQueue();return;}
 if(d.move){if(!running&&selected<0&&getProgram().length>=getCommandLimit()){feedback(`めいれいは ${getCommandLimit()}こまで。いらない めいれいを けすか、おきかえよう。`);return;}editProgram(()=>{const p=getProgram();if(selected>=0){p[selected]=d.move;selected=-1;}else if(p.length<getCommandLimit())p.push(d.move);});return;}
 if(b.id==='deselect'){selected=-1;drawQueue();return;}
 if(['undo','clear','seed'].includes(b.id)){editProgram(()=>{const p=getProgram();if(b.id==='clear')state.programs[mazeIndex]=[];else if(b.id==='seed')state.programs[mazeIndex]=[...getMaze().seed];else if(selected>=0)p.splice(selected,1);else p.pop();selected=-1;});return;}
 if(b.id==='run'||b.id==='step'){await runMaze(b.id==='step');return;}
 if(d.checkIndex!==undefined){checkIndex=+d.checkIndex;render('activityTitle');return;}
 if(d.checkAnswer!==undefined){const q=CHECKS[checkIndex],ok=+d.checkAnswer===q.ok;if(ok&&!state.checks.includes(checkIndex))state.checks.push(checkIndex);feedback((ok?'そのとおり！ ':'たいけんを おもいだしてみよう。 ')+q.why);save();return;}
 if(b.id==='previousCheck'){checkIndex=Math.max(0,checkIndex-1);render('activityTitle');return;}
 if(b.id==='nextCheck'){checkIndex=state.checks.length===3?0:checkIndex<2?checkIndex+1:[0,1,2].find(i=>!state.checks.includes(i));render('activityTitle');return;}
 if(d.reflect!==undefined){const i=+d.reflect;state.reflection=state.reflection.includes(i)?state.reflection.filter(x=>x!==i):[...state.reflection,i];b.textContent=state.reflection.includes(i)?'✓ はなしたよ':'となりの ひとに はなしたよ';b.setAttribute('aria-pressed',String(state.reflection.includes(i)));save();return;}
 if(b.id==='print'){document.body.classList.add('print-certificate');window.print();document.body.classList.remove('print-certificate');}
});
document.addEventListener('input',e=>{if(e.target.id==='zoom'){state.crop.zoom=+e.target.value;updateCrop();}if(e.target.id==='customCaption'){state.crop.custom=e.target.value.slice(0,32);updateCrop();}});
document.addEventListener('change',e=>{if(e.target.id==='level'){state.level=e.target.value==='hard'?'hard':'easy';if(state.level==='easy'&&state.crop.headline===3)state.crop.headline=1;render();}if(e.target.id==='furigana'){state.ruby=e.target.checked;save();document.body.classList.toggle('no-ruby',!state.ruby);}if(e.target.id==='repeat'){state.repeats[mazeIndex]=+e.target.value;editProgram(()=>{});}if(e.target.id==='locationShare'){state.photo.location=e.target.checked;updatePhoto();}});
document.addEventListener('submit',e=>{e.preventDefault();if(e.target.id==='huntForm'){const code=$('#code').value.normalize('NFKC').trim().toUpperCase(),i=STATIONS.findIndex(c=>c.code===code);if(i<0){feedback('この あいことばは みつからないよ。カードを もういちど みよう。','codeFeedback');return;}const already=state.hunt.found.includes(i);if(!already)state.hunt.found.push(i);render();feedback(already?'この カードは もう みつけたよ。':'カードを はっけん！ みちを ならべる ところで つかえるよ。','codeFeedback');return;}if(e.target.id==='cipherForm'&&allDone()&&state.checks.length===3){if(normal($('#secret').value)==='たしかめ'){state.cipher=true;render('pageTitle');}else feedback('4つの たいけんの もじを、①から よもう。さいごの「る」は いれないよ。');}});
window.addEventListener('hashchange',()=>render('pageTitle'));
render();
