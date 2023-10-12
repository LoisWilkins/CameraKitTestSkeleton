import  {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D
} from '@snap/camera-kit'

(async function(){
    var cameraKit = await bootstrapCameraKit({apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjk3MTIzODM1LCJzdWIiOiJlOTM0MjFjZC0yODZiLTRiMzktOWU1YS1kODRlZWZhMzRkNWZ-U1RBR0lOR35jYWNhZWM2MC1lYTgwLTQ1MTktYmEzOC0yMDAyYjc0YzBhMmMifQ.RXrD2bvTHFVsfixBQtqdYjuTre0Uj5W-jWDIbF-qL1A'})
    const session= await cameraKit.createSession()
    document.getElementById('canvas').replaceWith(session.output.live)

    const {lenses}= await cameraKit.lensRepository.loadLensGroups(['26913f30-2f98-44c5-87be-44208fb30fcb'])

    session.applyLens(lenses[0])
    let mediaStream= await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
    
    });

    const source =createMediaStreamSource(mediaStream,{
        // transform: Transform2D.MirrorX,
        // cameraType: 'front'
        cameraType: 'back'
    })

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth,window.innerHeight)

    session.play()
    

})();
