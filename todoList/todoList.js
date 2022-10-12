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

  let map = new Map();

  // rowId 세팅
  let tableCount = document.getElementById("table-body").childElementCount + 1;

  map.set("rowId", tableCount);
  map.set("date", date);
  map.set("content", content);

  // Object 변환 (Dto)
  let obj = Object.fromEntries(map);
  console.log(Object.fromEntries(map));
  console.log("obj: " + obj);

  addHtml = `<tr id="tr-${tableCount}">
            <td>
              <input
                type="checkbox"
                name="checkRow"
                class="check_all_list"
                onclick="checkAllList(event)"
              />
            </td>
            <td>${map.get("date")}</td>
            <td id="content-${tableCount}">${map.get("content")}</td>
            <td><input
                type="checkbox"
                name="checkComplete"
                onclick="checkComplete()"
              /></td>
            <td><span style="color: red; cursor:pointer;" onclick="javascript:deleteData(${tableCount++});">삭제</span>&nbsp;&nbsp;
          <span style="color: blue; cursor:pointer;" data-toggle="modal" data-target="#singleUpdateModal" onclick="setBeforeText(${tableCount})">
    수정
  </span></td>
          </tr>`;

  document.getElementById("table-body").innerHTML += addHtml;

  // 입력폼 초기화
  document.getElementById("date").value = "";
  document.getElementById("content").value = "";
};

/**
 * 단건 삭제
 */
deleteData = (id) => {
  document.getElementById("tr-" + id).remove();
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

    $("input:checkbox[name='allCheck']").prop("checked", false);
  });
};

/**
 * 단건 수정
 */
updateData = () => {
  let beforeText = document.getElementById("beforeUpdateText").value;
  let afterText = document.getElementById("afterUpdateText").value;

  let tableId = document.getElementById("table-id").value;

  if (afterText == "") {
    alert("수정하실 텍스트를 입력하세요.");
    return;
  }

  document.getElementById("content-" + (tableId - 1)).textContent = afterText;
  document.getElementById("beforeUpdateText").value = "";
  document.getElementById("afterUpdateText").value = "";

  document.getElementById("close-update-modal").click();
};

/**
 * 일괄 수정
 */
updateDataAll = () => {
  console.log("일괄 수정 호출 11111111111");
  let beforeText = document.getElementById("beforeUpdateTexts").value;
  let data = getAllData();

  for (let item of data) {
    let checkText = item.children[2].textContent.includes(beforeText);
    let afterText = document.getElementById("afterUpdateTexts").value;

    // true 반환시 수정
    if (!checkText) {
      alert("해당하는 문자열이 존재하지 않습니다.");
      return;
    }

    document.getElementById("afterUpdateTexts").value = checkText.replace(
      beforeText,
      afterText
    );
  }

  document.getElementById("beforeUpdateTexts").value = "";
  document.getElementById("afterUpdateTexts").value = "";

  document.getElementById("close-modal").click();
};

/**
 * 데이터 반환
 */
getAllData = () => {
  let data = [];

  let table = document.getElementById("table-body").children;

  let tableCount = document.getElementById("table-body").childElementCount;

  if (tableCount == 0) {
    alert("저장된 항목이 없습니다.");
    return;
  }

  for (let item of table) {
    let map = new Map();

    map.set("rowId", tableCount + 1);
    map.set("date", item.children[1].textContent);
    map.set("content", item.children[2].textContent);

    // Object 변환 (Dto)
    let obj = Object.fromEntries(map);
    console.log(Object.fromEntries(map));
    console.log("obj: " + obj);

    data.push(obj);
    console.log(data);
  }
  return data;
};

/**
 *
 */
gewRowId = () => {
  let tableCount = document.getElementById("table-body").childElementCount;
  return tableCount + 1;
};

/**
 * 데이터 JSON 형식으로 반환
 */
showJsonData = () => {
  let data = getAllData();
  let arrData = new Array();
  let tableCount = data.childElementCount;

  if (tableCount == 0) {
    alert("저장된 데이터가 없습니다.");
    return;
  }

  for (let item of data) {
    arrData.push(item);
  }

  alert(JSON.stringify(arrData));
};

/**
 * JSON 파일 호출
 */
getJsonFile = () => {
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost/todo.json",
      type: "get",
      dataType: "json",
    })
      .done(function (response) {
        console.log("통신 성공");
        console.log(response.data);
      })
      .fail(function (error) {
        console.log("통신 실패");
        console.log(error);
      });
  });

  promise.then(
    (num) => {
      console.log("promise 1111111111");
    },
    (error) => {
      console.log("111111111111");
    }
  );
};

/**
 * 수정 전 텍스트 세팅
 */
setBeforeText = (id) => {
  let text = document.getElementById("content-" + (id - 1)).textContent;
  document.getElementById("beforeUpdateText").value = text;
  document.getElementById("table-id").value = id;
};
