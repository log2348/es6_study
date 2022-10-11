 
 /**
  * 
  * Datepicker는 국내와 표기 순서가 다르기 때문에
  * 한국어로 변환하는 과정이 필요하다.
  */
  $.datepicker.setDefaults({
    dateFormat: "yy-mm-dd",
    prevText: "이전 달",
    nextText: "다음 달",
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    showMonthAfterYear: true,
    yearSuffix: "년",
    minDate: 0,
  });

  $(function () {
    $(".datepicker").datepicker();
  });

  // CheckBox
  allCheck = (e) => {
    // 전체 체크 버튼 클릭시 전체 체크 및 해제
    if (e.target.checked) {
      document.querySelectorAll(".check_all_list").forEach(function (v, i) {
        v.checked = true;
      });
    } else {
      document.querySelectorAll(".check_all_list").forEach(function (v, i) {
        v.checked = false;
      });
    }
  }

  checkAllList = (e) => {
    // 체크 버튼 클릭시 전체 체크 버튼 체크 및 해제
    let checkCount = 0;
    document.querySelectorAll(".check_all_list").forEach(function (v, i) {
      if (v.checked === false) {
        checkCount++;
      }
    });
    if (checkCount > 0) {
      document.getElementById("allCheck").checked = false;
    } else if (checkCount === 0) {
      document.getElementById("allCheck").checked = true;
    }
  }

  /**
   * 
   * layer popup
   */
  $(".btn-example").click(function () {
    var $href = $(this).attr("href");
    layer_popup($href);
  });

  layer_popup = (el) => {
    
    var $el = $(el); //레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass("dimBg"); //dimmed 레이어를 감지하기 위한 boolean 변수
    console.log("popuo: "  + $el);
    isDim ? $(".dim-layer").fadeIn() : $el.fadeIn();

    var $elWidth = ~~$el.outerWidth(),
      $elHeight = ~~$el.outerHeight(),
      docWidth = $(document).width(),
      docHeight = $(document).height();

    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
      $el.css({
        marginTop: -$elHeight / 2,
        marginLeft: -$elWidth / 2,
      });
    } else {
      $el.css({ top: 0, left: 0 });
    }

    $("#btn_close").click(function () {
      isDim ? $(".dim-layer").fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
      return false;
    });

    $(".layer .dimBg").click(function () {
      $(".dim-layer").fadeOut();
      return false;
    });
  }

  /**
   * 
   * 데이터 추가
   */
  saveData = () => {
    let addHtml = "";

    let date = document.getElementById("date").value;
    let content = document.getElementById("content").value;

    if (date == "") {
      alert("날짜를 선택하세요.");
      return;
    } else if (content == "") {
      alert("내용을 입력하세요.");
      return;
    } else {

      // key 값
      const arry = ['date', 'content'];
      let map = new Map();

      arry.forEach((element) =>
          map.set(element, document.getElementById(element).value)
      );

      //HTML 코드 생성
      console.log("!111111111" + map.get('date'));

      map.forEach((value, key) => console.log("key: " + key +" value : " + value));

      // Object 변환 (Dto)
      let str = JSON.stringify(Object.fromEntries(map));
      console.log("Str : " + str);

      var data = JSON.parse(str);
      console.log("333333333" + data);
      var lastId = document.getElementById("table_body").childElementCount;

      addHtml = `
          <tr id="tr_${lastId}">
          <td>
            <input
              type="checkbox"
              class="check_all_list"
              name="checkRow"
              onclick="checkAllList(event)"
            />
          </td>
          <td>${map.get('date')}</td>
          <td id="tr_${lastId}_content">${map.get('content')}</td>
          <td><button type="button" class="btn btn-danger" onclick="javascript:deleteData(${lastId++});">삭제</button></td>
          <td><button type="button" class="btn btn-primary" onclick="javascript:updateData(${lastId++});">수정</button></td>
          <td>
              <input
                type="checkbox"
                onclick="checkComplete()"
              />
            </td>
        </tr>`
        document.getElementById("table_body").innerHTML += addHtml;

        document.getElementById("date").value = "";
        document.getElementById("content").value = "";
    }
  }

  /**
   * 
   * 단건 삭제
   */
  deleteData = (id) => {

    document.getElementById("tr_" + id).remove();

  }

  /**
   * 
   * 다중 삭제
   */
  deleteSelectedData = () => {

    let cnt = $("input:checkbox[name='checkRow']:checked").length;

    if ($("input:checkbox[name='checkRow']:checked").length == 0) {
      alert("선택된 항목이 없습니다.");
      return;
    }

    //체크된 체크박스를 가져온다.
    let checkbox = $("input:checkbox[name=checkRow]:checked");

    //체크된 체크박스의 값을 반복해 불러옴.
    checkbox.each(function(k, v) {
      let a = v.parentElement.parentElement.parentElement;
      $(a).remove();
    });
  }

  /**
   * 
   * 단건 수정
   */
   updateData = (id) => {
    showLayerPopup();
    var $href = $(this).attr("href");
    layer_popup($href);

    let str = $("#content").value;

    str = str.replace('old', 'new');
    console.log(str);
    
  }

  /**
   * 
   * 일괄 수정
   */
  updateDataAll = () => {
    console.log(">>>>>>>>>")
    var cnt = document.getElementById("table_body").childElementCount;
    console.log("cnt:" + cnt);
    var standard = document.getElementById("standard").value;
    console.log("standard:" + standard);
    for(var i = 0; i < cnt ; i++){
      var content = document.getElementById("tr_" + i + "_content").innerHTML;

      // TODO 메서드 만들기
      var strArray = content.split(standard);
      var newStr = ""
      for(var i = 0; i < strArray.length; i ++){
        newStr += strArray[i]
        if(i != strArray.length - 1){
          newStr += standard;
        }
      }

      console.log("content:" + content);
      if (content == standard) {
        document.getElementById("tr_" + i).content = document.getElementById("aStandard").value;
      }
    }
  }

  /**
   * 
   * 팝업창 열기
   */
  showLayerPopup = () => {
    let str = "";
    str += `<div id="layer2" class="pop-layer">
    <div class="pop-container">
      <div class="pop-conts">
        <!--content //-->
        <div class="row">
          <label><b>변환 전</b></label>&nbsp;&nbsp;
          <input
            class="text"
            value=""
            disabled="true"
          />
        </div>
        <br/>
        <div class="row">
          <label><b>변환 후</b></label>&nbsp;&nbsp;
          <input
            class="text"
          />
        </div>
        <div class="btn-r">
          <a href="#" class="btn-layerClose">수정</a>
        </div>

        <div class="btn-r">
          <a href="#" class="btn-layerClose">Close</a>
        </div>
        <!--// content-->
      </div>
    </div>
  </div>`;
  document.getElementById("dim-layer").innerHTML = str;
  console.log("sssssssssssssssssssssssss");
  }

/**
 * 
 * 완료여부 체크
 */
checkComplete = () => {

  if($("#complete_check").checked) {

  } else {

  }
}