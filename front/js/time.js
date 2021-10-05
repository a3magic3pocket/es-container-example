// updateKoreanTime : 한국 시간 업데이트
function updateKoreanTime() {
    const elemMap = {}
    const ids = ["korea-time", "korea-time-error"]

    for (let i=0; i<ids.length; i++) {
        const id = ids[i]
        const elem = document.querySelector(`#${id}`)
        if (elem === null) {
            console.warn(`A element of ${id} is not exists.`)
            return
        }
        elemMap[id] = elem
    }
  
    function successFunc(jespJSON) {
      console.log("successFunc", jespJSON)
      const koreaTime = jespJSON["data"]
      if (jespJSON["data"] !== "undefined") {
        elemMap["korea-time"].innerText = koreaTime
      }
    }
  
    function failFunc(error) {
      console.log("error", error)
      if (typeof error !== "undefined") {
        elemMap["korea-time-error"].innerText = error
      }
    }

    if (typeof requestGetKoreanTime !== "undefined") {
        requestGetKoreanTime(successFunc, failFunc)
    }
  }
  