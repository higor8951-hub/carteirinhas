window.A=(window.A||[]).concat([[46,"Biodiesel (Produção 01)","Alta","3.26,3.27","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.10.1,8.10.3,8.10.4,8.10.5,8.11.2,8.11.4,9.1.1,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[47,"Biodiesel (Carga)","Alta","3.26,3.27","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.10.1,8.10.4,8.11.1,8.11.2,8.11.6,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[48,"Biodiesel (Descarga)","Alta","3.26,3.27","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.10.1,8.10.4,8.11.1,8.11.2,8.11.6,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[49,"Biodiesel (Produção 02)","Alta","3.28","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.10.1,8.10.3,8.10.4,8.10.5,8.11.2,8.11.4,9.1.1,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[50,"Tanques Biodiesel","Alta","","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.10.2,8.10.4,8.10.5,8.11.2,9.1.1,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[51,"Área de Convivência","Básica","3.31","10.0,11.0,12.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[52,"Portaria 02 - Veículos","Básica","3.31","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.1,8.11.2,8.11.6,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[53,"Casa de Bombas","Alta","3.29","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[54,"Faturamento","Básica","3.31","10.0,11.0,12.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[55,"Banheiro Motoristas","Básica","3.31","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[56,"Classificação (Entrada)","Média","3.30","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.1,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[57,"Balança Fundos","Média","3.31","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.1,8.11.2,8.11.6,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[58,"Tanque Diesel","Alta","","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"],[59,"Baia de Resíduos","Média","","10.0,11.0,13.0,14.0,15.0,16.0,5.0,7.0,8.11.2,9.1.2,9.1.3,9.1.4,9.1.5,9.1.6,9.PEM"]]);

// Mapa técnico de alta nitidez, derivado diretamente da Planta de Risco original.
// Mantém o mapa antigo como contingência caso algum arquivo HD não esteja disponível.
document.addEventListener('DOMContentLoaded',()=>{
  const files=[
    'clear01.txt','clear02.txt','clear03.txt','clear04.txt','clear05.txt',
    'clear06.txt','clear07.txt','clear08.txt','clear09.txt','clear10.txt','clear11.txt',
    'clear12a.txt','clear12b.txt','clear13.txt','clear14.txt','clear15.txt',
    'clear16.txt','clear17.txt','clear18.txt','clear19.txt','clear20.txt'
  ];
  Promise.all(files.map(f=>fetch(f,{cache:'force-cache'}).then(r=>{
    if(!r.ok) throw new Error('Falha ao carregar '+f);
    return r.text();
  }))).then(parts=>{
    const img=document.getElementById('plant');
    if(!img) return;
    img.src='data:image/webp;base64,'+parts.join('');
    img.dataset.quality='hd';
    img.style.width='1600px';
    img.style.maxWidth='none';
    img.style.imageRendering='auto';
    img.title='Planta de risco — versão de alta nitidez';
    const box=img.closest('.mapbox')||img.parentElement;
    if(box){
      box.dataset.mapQuality='hd';
      box.setAttribute('aria-label','Mapa técnico em alta resolução. Use zoom e arraste para navegar.');
    }
  }).catch(err=>console.warn('Mapa HD indisponível; mantendo mapa de contingência.',err));
});
