window.A=(window.A||[]).concat([[46,"Biodiesel (Produção 01)","Alta","3.26,3.27","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.10.1,8.10.3,8.10.4,8.10.5,8.11.2,8.11.4,9.1.1,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[47,"Biodiesel (Carga)","Alta","3.26,3.27","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.10.1,8.10.4,8.11.1,8.11.2,8.11.6,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[48,"Biodiesel (Descarga)","Alta","3.26,3.27","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.10.1,8.10.4,8.11.1,8.11.2,8.11.6,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[49,"Biodiesel (Produção 02)","Alta","3.28","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.10.1,8.10.3,8.10.4,8.10.5,8.11.2,8.11.4,9.1.1,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[50,"Tanques Biodiesel","Alta","","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.10.2,8.10.4,8.10.5,8.11.2,9.1.1,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[51,"Área de Convivência","Básica","3.31","10.0,11.0,12.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[52,"Portaria 02 - Veículos","Básica","3.31","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.1,8.11.2,8.11.6,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[53,"Casa de Bombas","Alta","3.29","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[54,"Faturamento","Básica","3.31","10.0,11.0,12.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[55,"Banheiro Motoristas","Básica","3.31","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[56,"Classificação (Entrada)","Média","3.30","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.1,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[57,"Balança Fundos","Média","3.31","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.1,8.11.2,8.11.6,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[58,"Tanque Diesel","Alta","","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[59,"Baia de Resíduos","Média","","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"]]);

// Mapa operacional fiel à geometria da Planta de Risco oficial (PSCIP 8/08).
// O PEB foi ajustado conforme validação operacional da unidade: lateral da Refinaria, próximo à ETE e Gerência.
document.addEventListener('DOMContentLoaded',async()=>{
  const img=document.getElementById('plant');
  if(!img) return;
  const files=Array.from({length:17},(_,i)=>`map-data-${String(i+1).padStart(2,'0')}.js`);
  try{
    const texts=await Promise.all(files.map(f=>fetch(f,{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error(f);return r.text();})));
    const parts=texts.map(t=>{const m=t.match(/\+"([A-Za-z0-9+/=]+)";/);return m?m[1]:'';});
    if(parts.some(p=>!p)) throw new Error('chunk inválido');
    const official='data:image/webp;base64,'+parts.join('');
    const apply=()=>{
      img.src=official;
      img.dataset.quality='official';
      img.style.width='1800px';
      img.style.maxWidth='none';
      img.style.imageRendering='auto';
      img.title='Mapa operacional — base oficial PSCIP 8/08';
      const box=img.closest('.mapbox')||img.parentElement;
      if(box){
        box.dataset.mapQuality='official';
        box.setAttribute('aria-label','Mapa operacional baseado na Planta de Risco oficial. Use zoom e arraste para navegar.');
      }
    };
    apply();
    setTimeout(apply,1800);
  }catch(err){
    console.warn('Mapa oficial indisponível; usando contingência.',err);
    img.src='mapa-operacional.svg';
  }

  document.querySelectorAll('.notice').forEach(el=>{
    if(el.textContent.trim().startsWith('PEB:')){
      el.innerHTML='<b>PEB:</b> lateral da Refinaria, próximo à ETE e à Gerência. Local confirmado para uso operacional da unidade.';
    }
  });
});