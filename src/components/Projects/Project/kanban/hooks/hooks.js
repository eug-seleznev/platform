import { useRef, useEffect } from "react"

export const useClickOutside = (callback) => {
    let domNode = useRef()
    useEffect(()=>{
      let handler = (e) => {
        if (domNode && domNode.current && !domNode.current.contains(e.target)){
          callback()
        }
      }
      document.addEventListener('mousedown',handler)
      return () => document.removeEventListener('mousedown', handler)
    })
  
  return domNode
  }
  
  export const useEscapeClick = (callback) => {
    useEffect(() => {
        const handler = (e) => {
          if(e.keyCode === 27){
            callback()
          }
        }
        window.addEventListener('keydown', handler)
      return () => window.removeEventListener('keydown', handler)
      },[])
  }