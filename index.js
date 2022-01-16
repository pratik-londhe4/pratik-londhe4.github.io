let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
let playerPosition = {
    x : 0,
    y : 0
}



let loadImage = (src , callback) =>{
    let img = new Image();
    img.onload = () => callback(img);
    img.src = src;

}

let imgPath = (n , animation) => `/images/${animation}/${n}.png`;

let frame = {
    idle : [1,2,3,4,5,6,7,8],
    kick : [1,2,3,4,5,6,7],
    punch : [1,2,3,4,5,6,7],
    forward : [1,2,3,4,5,6],
    backward : [1,2,3,4,5,6],
    block : [1,2,3,4,5,6,7,8,9]


}

let loadImages = (callback) =>{
    let images = {
        idle : [],
        kick : [],
        punch: [],
        forward : [],
        backward : [],
        block : []
    };
    let rem = 0;
    ["idle" , "kick" , "punch" , 'forward' , 'backward' , 'block'].forEach(frames=>{
        let animationFrames = frame[frames];
        rem = rem + animationFrames.length;

        animationFrames.forEach(n =>{
            let path = imgPath(n , frames);

            loadImage(path , (image)=>{
                images[frames][n -1] = image;
                rem-=1;

                if(rem === 0){
                    callback(images);
                }

            })
        })

    })
}


let animate = (ctx , images ,animation ,  callback) =>{



    images[animation].forEach((image , index)=>{
        setTimeout(()=>{
            ctx.clearRect(0 , 0 , c.width , c.height);
            if (animation === 'forward')playerPosition.x+=20;
            if (animation === 'backward')playerPosition.x-=20;
            if (playerPosition.x > (900) ||playerPosition.x < 0 ) playerPosition.x = 0;



            ctx.drawImage(image , playerPosition.x, playerPosition.y , 500 , 500);

        } , index * 100);
    });

    setTimeout(callback , images[animation].length * 100);


}


loadImages((images)=>{

    let animationQ = [];
    let selectedAnimation ;
    let aux = () =>{

        if (animationQ.length === 0){
            selectedAnimation = 'idle';

        }else {
            selectedAnimation = animationQ.shift();
        }
        animate(ctx , images ,selectedAnimation ,  aux)

    }

aux();

    document.getElementById("kick").onclick = () =>{
        animationQ.push('kick');
    }


    document.getElementById("punch").onclick = () =>{
        animationQ.push('punch');
    }

    document.getElementById("forward").onclick = () =>{
        animationQ.push('forward');
    }

    document.getElementById("backward").onclick = () =>{
        animationQ.push('backward');
    }

    document.getElementById("block").onclick = () =>{
        animationQ.push('block');
    }

    document.addEventListener('keyup' , (event)=>{
       const key = event.key;

       if (key === 'ArrowLeft') animationQ.push('kick');
       if (key === 'ArrowRight') animationQ.push('punch');
        if (key === 'ArrowUp') animationQ.push('forward');
        if (key === 'ArrowDown') animationQ.push('backward');
        if (key === 'Shift') animationQ.push('block');



    })
})



   





