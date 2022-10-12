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
    document.querySelectorAll(".check_all_list").forEach(function (v) {
      v.checked = true;
    });
  } else {
    document.querySelectorAll(".check_all_list").forEach(function (v) {
      v.checked = false;
    });
  }
};

checkAllList = () => {
  // 체크 버튼 클릭시 전체 체크 버튼 체크 및 해제
  let checkCount = 0;
  document.querySelectorAll(".check_all_list").forEach(function (v) {
    if (v.checked === false) {
      checkCount++;
    }
  });
  if (checkCount > 0) {
    document.getElementById("allCheck").checked = false;
  } else if (checkCount === 0) {
    document.getElementById("allCheck").checked = true;
  }
};

/**
 * 데이터 추가
 */
addData = () => {
  let addHtml = "";

  let date = document.getElementById("date").value;
  let content = document.getElementById("content").value;

  if (date == "") {
    alert("날짜를 선택하세요.");
    return;
  }

  if (content == "") {
    alert("내용을 입력하세요.");
    return;
  }
  // key 값을 담은 배열
  const arry = ["date", "content"];
  let map = new Map();

  arry.forEach((element) =>
    map.set(element, document.getElementById(element).value)
  );

  // rowId 세팅
  let tableCount = document.getElementById("table_body").childElementCount + 1;
  map.set("rowId", tableCount);

  map.forEach((value, key) => console.log("key: " + key + " value : " + value));

  // Object 변환 (Dto)
  let obj = Object.fromEntries(map);
  console.log(Object.fromEntries(map));
  console.log("obj: " + obj);

  addHtml = `<tr id="tr_${tableCount}">
            <td>
              <input
                type="checkbox"
                name="checkRow"
                class="check_all_list"
                onclick="checkAllList(event)"
              />
            </td>
            <td>${map.get("date")}</td>
            <td id="tr_${tableCount}_content">${map.get("content")}</td>
            <td><input
                type="checkbox"
                onclick="checkComplete()"
              /></td>
            <td><button type="button" class="btn btn-danger" onclick="javascript:deleteData(${tableCount++});">삭제</button>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#singleUpdateModal">
    수정
  </button></td>
          </tr>`;

  document.getElementById("table_body").innerHTML += addHtml;

  // 입력폼 초기화
  document.getElementById("date").value = "";
  document.getElementById("content").value = "";
};

/**
 * 단건 삭제
 */
deleteData = (id) => {
  document.getElementById("tr_" + id).remove();
};

/**
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

  //체크된 체크박스의 값을 반복해 불러온다.
  checkbox.each(function (k, v) {
    let a = v.parentElement.parentElement;
    $(a).remove();

    // TODO 전체 선택 체크박스 체크 풀리도록
  });
};

/**
 * 단건 수정
 */
updateData = () => {
  let beforeText = document.getElementById("beforeUpdateText").value;
  let afterText = document.getElementById("afterUpdateText").value;

  if (afterText == "") {
    alert("수정하실 텍스트를 입력하세요.");
    return;
  }

  str = str.replace(beforeText, afterText);
  console.log(str);
};

/**
 * 일괄 수정
 */
updateDataAll = () => {
  let beforeText = document.getElementById("beforeUpdateTexts").value;
  let allData = getAllData();

  // TODO for문 돌리기
  const checkText = allData[0].content.includes(beforeText);
  console.log("update 다중건" + beforeText);

  // true 반환시 수정
  if (!checkText) {
    alert("해당하는 문자열이 존재하지 않습니다.");
    return;
  }

  let afterText = document.getElementById("afterUpdateTexts").value;

  allData[0].content.replace(beforeText, afterText);
};

/**
 * 완료여부 체크
 */
checkComplete = () => {
  if ($("#complete_check").checked) {
    // TODO 체크되면 completeState 값 true로 변경
  } else {
  }
};

/**
 * 데이터 반환
 */
getAllData = () => {
  let data = [];

  let table = document.getElementById("table_body");

  let tableCount = document.getElementById("table_body").childElementCount;

  if (tableCount == 0) {
    alert("저장된 항목이 없습니다.");
    return;
  }

  for (let item of table) {
    // key 값을 담은 배열
    const arry = ["date", "content"];
    let map = new Map();

    arry.forEach((element) =>
      map.set(element, document.getElementById(element).value)
    );

    map.set("rowId", gewRowId());
    console.log("rowId 가져와지나요? : " + getRowId());

    // Object 변환 (Dto)
    let obj = Object.fromEntries(map);
    console.log(Object.fromEntries(map));
    console.log("obj: " + obj);

    data.push(obj);
    console.log("배열 출력 : " + data);

    return data;
  }
};

/**
 *
 */
gewRowId = () => {
  let tableCount = document.getElementById("table_body").childElementCount;
  return tableCount + 1;
};

/**
 * 데이터 JSON 형식으로 반환
 */
getJsonData = () => {
  getAllData();
  alert("11111111111");
};
