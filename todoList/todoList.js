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
  let rowData = {
    rowId: 0,
    date: "",
    content: "",
  };

  rowData.date = document.getElementById("date").value;
  rowData.content = document.getElementById("content").value;

  if (rowData.date == "") {
    alert("날짜를 선택하세요.");
    return;
  }

  if (rowData.content == "") {
    alert("내용을 입력하세요.");
    return;
  }

  // // rowId 세팅
  let tableCount = document.getElementById("table-body").childElementCount;
  rowData.rowId = tableCount;

  addHtml = `<tr id="tr-${rowData.rowId}">
            <td>
              <input
                type="checkbox"
                name="checkRow"
                class="check_all_list"
                onclick="checkAllList(event)"
              />
            </td>
            <td id="date-${rowData.rowId}">${rowData.date}</td>
            <td id="content-${rowData.rowId}">${rowData.content}</td>
            <td><input
                type="checkbox"
                name="checkComplete"
                onclick="checkComplete()"
              /></td>
              <input
              type="hidden"
              id="row-id"
            />
            <td><span style="color: red; cursor:pointer;" onclick="javascript:deleteData(${rowData.rowId});">삭제</span>&nbsp;&nbsp;
          <span style="color: blue; cursor:pointer;" data-toggle="modal" data-target="#singleUpdateModal" onclick="setBeforeText(${rowData.rowId})">
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
  let afterText = document.getElementById("after-update-text").value;
  let tableId = document.getElementById("table-id").value;

  if (afterText == "") {
    alert("수정하실 텍스트를 입력하세요.");
    return;
  }

  document.getElementById("content-" + tableId).textContent = afterText;
  document.getElementById("before-update-text").value = "";
  document.getElementById("after-update-text").value = "";

  document.getElementById("close-update-modal").click();
};

/**
 * 일괄 수정
 */
updateDataAll = () => {
  let datas = getAllData();
  console.log(datas);
  let beforeText = document.getElementById("beforeUpdateTexts").value;
  let afterText = document.getElementById("afterUpdateTexts").value;
  console.log("시작");

  for (var data of datas) {
    var oldStr = "";
    var newStr = "";
    oldStr = data.content;

    if (oldStr.indexOf(beforeText) != -1) {
      var arry = oldStr.split(beforeText);
      for (var i = 0; i < arry.length; i++) {
        newStr += arry[i];
        if (i != arry.length - 1) {
          newStr += afterText;
        }
      }
      data.content = newStr;
    }
  }
  console.log("check!!!!!");
  console.log(datas);

  for (let item of datas) {
    document.getElementById("content-" + item.rowId).textContent = item.content;
  }
  document.getElementById("beforeUpdateTexts").value = "";
  document.getElementById("afterUpdateTexts").value = "";

  document.getElementById("close-modal").click();
};

/**
 * 데이터 반환
 */
getAllData = () => {
  let datas = [];
  let tableCount = document.getElementById("table-body").childElementCount;

  if (tableCount == 0) {
    alert("저장된 항목이 없습니다.");
    return;
  }
  for (var i = 0; i < tableCount; i++) {
    let rowData = {
      rowId: 0,
      date: "",
      content: "",
    };
    rowData.rowId = i;
    rowData.content = document.getElementById("content-" + i).textContent;
    rowData.date = document.getElementById("date-" + i).textContent;
    datas.push(rowData);
  }

  return datas;
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
      url: "localhost/todo.json",
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
 * 외부 JSON 파일 항목 붙이기
 */
appendTable = () => {
  let addTableBody = `<tr id="tr-${rowId}">
            <td>
              <input
                type="checkbox"
                name="checkRow"
                class="check_all_list"
                onclick="checkAllList(event)"
              />
            </td>
            <td>${date}</td>
            <td id="content-${rowId}">${content}</td>
            <td><input
                type="checkbox"
                name="checkComplete"
                onclick="checkComplete()"
              /></td>
            <td><span style="color: red; cursor:pointer;" onclick="javascript:deleteData(${rowId});">삭제</span>&nbsp;&nbsp;
          <span style="color: blue; cursor:pointer;" data-toggle="modal" data-target="#singleUpdateModal" onclick="setBeforeText(${rowId})">
    수정
  </span></td>
          </tr>`;

  document.getElementById("table-body").innerHTML += addHtml;
};

/**
 * 수정 전 텍스트 세팅
 */
setBeforeText = (id) => {
  let text = document.getElementById("content-" + id).textContent;
  document.getElementById("before-update-text").value = text;
  document.getElementById("table-id").value = id;
};
