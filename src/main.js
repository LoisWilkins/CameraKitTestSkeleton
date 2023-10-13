import  {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D
} from '@snap/camera-kit' //module ajouter après le npm install

(async function(){
    //token de la lens

    var token1='eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjk3MTIzODM1LCJzdWIiOiJlOTM0MjFjZC0yODZiLTRiMzktOWU1YS1kODRlZWZhMzRkNWZ-U1RBR0lOR35jYWNhZWM2MC1lYTgwLTQ1MTktYmEzOC0yMDAyYjc0YzBhMmMifQ.RXrD2bvTHFVsfixBQtqdYjuTre0Uj5W-jWDIbF-qL1A'
    var token2='eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjk3MTk2NTYxLCJzdWIiOiJlYWU4N2ZlMi00ZDZhLTQ4YzItOWYxZi0yM2FhYjUxZmU3NzB-U1RBR0lOR344ODUzMmQzZC02YjhmLTQ4ZTEtOTcxZS01NjJlMTI3MmNhMTIifQ.tESA8QNw4YLTPLLWvv-v3BwMhPYjxZiT041QFapoJcs'
    var token=token2
    var cameraKit = await bootstrapCameraKit({apiToken: token}) 
    const session= await cameraKit.createSession()
    document.getElementById('canvas').replaceWith(session.output.live) //Le contenu cameraKit se met dans un canvas

    var key1='26913f30-2f98-44c5-87be-44208fb30fcb'
    var key2='d0371f69-7202-422a-a0d2-bf54b1adf8ed'
    var groupID=key2
    const {lenses}= await cameraKit.lensRepository.loadLensGroups([groupID])

    session.applyLens(lenses[0])
    let mediaStream= await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } //pour activer la caméra arrrière
    
    });

    const source =createMediaStreamSource(mediaStream,{
        // transform: Transform2D.MirrorX, //pas necessaire pour la demo
        // cameraType: 'front' //pour activer la caméra avant
        cameraType: 'back' //pour activer la caméra arrrière
    })

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth,window.innerHeight)

    session.play()
    

})();
