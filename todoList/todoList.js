// Datepicker는 국내와 표기 순서가 다르기 때문에 한국어로 변환하는 과정이 필요하다.
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
});

$(function () {
  $(".datepicker").datepicker();
});

// TODO 지난 날짜는 선택하지 못하도록

// CheckBox
function allCheck(e) {
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

function checkAllList(e) {
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

$(".btn-example").click(function () {
  var $href = $(this).attr("href");
  layer_popup($href);
});

function layer_popup(el) {
  var $el = $(el); //레이어의 id를 $el 변수에 저장
  var isDim = $el.prev().hasClass("dimBg"); //dimmed 레이어를 감지하기 위한 boolean 변수

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

  $el.find("a.btn-layerClose").click(function () {
    isDim ? $(".dim-layer").fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
    return false;
  });

  $(".layer .dimBg").click(function () {
    $(".dim-layer").fadeOut();
    return false;
  });
}

saveData = () => {
  // todoList 저장
  console.log("saveData() 호출 !");
};
