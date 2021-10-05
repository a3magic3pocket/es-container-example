// CommonRequest : 공용 Request 함수
function CommonRequest() {
  this.baseURL = "//localhost:8080"
}

// requestGetKoreanTime : 한국 시간 요청
function requestGetKoreanTime(successFunc, failFunc) {
  CommonRequest.call(this)
  const url = `${baseURL}/now`
    fetch(url)
      .then(resp => resp.json())
      .then(respJSON => successFunc(respJSON))
      .catch(error => failFunc(error))
}
