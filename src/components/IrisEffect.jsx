import { useEffect, useRef } from "react"

export function IrisEffect({setVisibility}){

    const iris_ref = useRef(null)

    function animation_finished(e){
        //first animation, toggle iris in

        setTimeout(() => {
            iris_ref.current.classList.add("iris-in")
        }, 1000);


        // iris in finished, now unmount
        if(e.animationName == "iris-in-animation"){
            setVisibility(false)
        }
        
    }

    return(

        <div ref={iris_ref} onAnimationEnd={animation_finished} className="finish-overlay iris-out">

        </div>
    )
}

