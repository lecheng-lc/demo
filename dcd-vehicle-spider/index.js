const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let vehicleDatabase = {};
const SLEEP_TIME = 200;
let brandIndex = 0;
let seriesIndex = 120;
const saveJson = async (data) => {
  // 原有的本地保存逻辑
  // const json = JSON.stringify(data, null, 2);
  // const blob = new Blob([json], { type: "application/json" });
  // const url = URL.createObjectURL(blob);
  // const a = document.createElement("a");
  // a.href = url;
  // a.download = "vehicle-model-data.json";
  // a.click();
  
  // 新增：发送到云端服务器
  try {
    console.error('发送到云端数据:', data);
    const payload = JSON.stringify(data);
    const response = await fetch('http://10.171.211.77:3000/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload
    });
    
    const text = await response.text();  // 先拿纯文本，避免直接 parse 炸掉
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error('后端返回非 JSON:', text);
      throw new Error(`后端返回非 JSON: ${text}`);
    }
    
    if (response.ok) {
      console.log('数据已发送到云端:', result.message || result);
    } else {
      console.error('发送到云端失败:', response.status, result);
    }
  } catch (error) {
    console.error('发送到云端出错:', error);
  }
};
const task = async () => {
  // tw-relative car-selector_selector__2E02F
  // - 第一个 品牌/车系
  // - 第二盒 车型
  const brandInput = document.querySelectorAll(
    ".tw-relative.car-selector_selector__2E02F",
  )[0];
  brandInput.click(); // 调出来第一个面板
  // tool-tip_wrapper__1lKlz
  // - 第一个是品牌+车系的弹窗
  // - 第二个是车型的弹窗
  //   document.querySelectorAll(".tool-tip_wrapper__1lKlz")[0].click(); // 调出来第一个弹窗
  await sleep(SLEEP_TIME);
   if(brandIndex > 0) return
  // return
  // 获取品牌列表
  const brandlistLength = document.querySelectorAll(
    ".tool-tip_wrapper__1lKlz .jsx-2401233222.brand-list",
  )[0];
  if (!brandlistLength) {
    await sleep(SLEEP_TIME * 2);
  }

  const brandList = document
    .querySelectorAll(".tool-tip_wrapper__1lKlz .jsx-2401233222.brand-list")[0]
    .querySelectorAll(".jsx-2401233222.brand");
  // 模拟品牌点击
  const brandDomObj = brandList[brandIndex];
  if (!brandDomObj) {
    await saveJson(vehicleDatabase);
    return;
  }
  brandList[brandIndex].click();

  await sleep(SLEEP_TIME);
  while (
    document
      .querySelector(".tool-tip_wrapper__1lKlz .jsx-232230372.series-selector")
      ?.textContent?.includes("加载中")
  ) {
    await sleep(SLEEP_TIME);
  }
  // 品牌下有多少的车系
  const seriesList = document.querySelectorAll(
    ".tool-tip_wrapper__1lKlz .jsx-232230372.series-selector p.jsx-232230372",
  );

  //   const seriesLength = seriesList.length
  const seriesObj = seriesList[seriesIndex];
  if (seriesObj) {
    seriesList[seriesIndex].click(); // 模拟车系车系点击
    seriesIndex++;
  } else {
    // 挡车系不存在的时候，切换品牌
    brandIndex++;
    seriesIndex = 0;
    seriesList[seriesIndex].click()
    console.log(seriesIndex, vehicleDatabase); 
    await saveJson(vehicleDatabase);
    vehicleDatabase = {}
    return task();
  }
  await sleep(SLEEP_TIME);
  //  模拟点击车型
  const mockModelInput = document.querySelectorAll(
    ".tw-relative.car-selector_selector__2E02F",
  )[1];
  mockModelInput.click();
  await sleep(SLEEP_TIME);
  // 获取已填入的品牌+车型
  const brandSeries = document
    .querySelectorAll(".tw-relative.car-selector_selector__2E02F")[0]
    .querySelector("input").value;
  vehicleDatabase[brandSeries] = [];
  // 获取车型列表
  const modelList = document
    .querySelectorAll(".tool-tip_wrapper__1lKlz")[1]
    .querySelectorAll("li");
  while (
    document
      .querySelectorAll(".tool-tip_wrapper__1lKlz")[1]
      .innerText.includes("加载中")
  ) {
    await sleep(SLEEP_TIME);
  }
  for (let i = 0; i < modelList.length; i++) {
    // modelList[i].click()
    const modelNamePrice = modelList[i].innerText.replace(/\n/g, "/");
    vehicleDatabase[brandSeries].push(modelNamePrice);
  }
  console.log(Object.keys(vehicleDatabase).length);
  task();
};

task();
