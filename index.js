const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

let target = document.getElementById("target");
        target.innerHTML =`
        <div class='col-12 text-center text-white bg-primary p-2'>
            <h1>Battery Finder Program</h1>
        </div>
        <div class='col-10 m-auto'>
            <div class='pt-3'>
                <p class='mb-0'>Step1: Select your brand</p> 
                <select id='brand' name='step1'></select>
            </div>
            <div class='pt-3'>  
                <p class='mb-0'>Step2: Select your model</p>
                <select id='model' class='object' name='step2'></select>
            </div>
            <div class='pt-3'>
                <p class='mb-0'>Step3: Input accessory power consumption</p>
                <div><input id='power' class='object' type="number" max="100" min="0" value="55"></div>   
            </div>
            <div class='pt-3'>
                <p class='mb-0'>Step4: Choose your battery</p>
                <div id='battery'></div>
            </div>
        </div>
    `;

// model名でソート
camera.sort(function(a,b) {
    if (a.model > b.model) return 1;
    else return -1;
});

// バッテリーの並び替え
battery.sort(function(a,b){
    if(a.batteryName > b.batteryName) return 1;
    else return -1;
});


class Steps{
    // brandの作成
    static CreateBrandList(){
        let brand;
        let brands = [];

        for(let i = 0; i < camera.length; i++){
            if(!brands.includes(camera[i]["brand"])){
                brands.push(camera[i]["brand"]);
            }
        }

        for(let i=0; i < brands.length; i++){
            brand += 
            `
            <option>${brands[i]}</option>
            `
        }

        return brand;
    }

    // modelの選択
    static selectModel(){
        const brand = document.getElementById("brand");
        let selectModel;

        for(let i = 0; i < camera.length; i++){
            if(camera[i]["brand"] === brand.value){
                selectModel +=
                `
                <option>${camera[i]["model"]}</option>
                `
            }
        }
        return selectModel;
    }

    // 条件に合致するbattery listの生成
    static getBattList(model, consumption){
        const batt = document.getElementById("battery");
        const minPower = (consumption - 0) + powerWh[model];
        let batteryList = "";
        for(let i = 0; i < battery.length; i++){
            const batteryPower = battery[i].endVoltage * battery[i].maxDraw;
            const powerCapacity = battery[i].capacityAh * battery[i].voltage;
            if(batteryPower > minPower) {
                batteryList += `
                <div class="w-100 bg-light border border-secondary d-flex flex-row justify-content-between align-items-center">
                    <strong><p class="pl-2 pb-2 pt-2 m-0">${battery[i].batteryName}</p></strong>
                    <p class="pl-2 pb-2 pt-2 mt-0 mb-0 ml-0 mr-2">Estimated ${Math.floor(powerCapacity / minPower * 10) / 10} hours</p>
                </div>
            `};
        }
        batt.innerHTML = batteryList;
        return batt;
    }
}

const inputWattEle = document.getElementById('power');
const chooseableModel = document.getElementById("model");

// cameraと消費電力の連想配列
let powerWh = {};
for(let i = 0; i < camera.length; i++){
    powerWh[camera[i].model] = camera[i].powerConsumptionWh;
}

function createBatteryFinder(){
    const selectedBrand = document.getElementById("brand");
    selectedBrand.innerHTML = Steps.CreateBrandList();

    // modelの取得
    chooseableModel.innerHTML = Steps.selectModel();

    // 初期のbatteryListの取得
    Steps.getBattList(chooseableModel.value, inputWattEle.value);

    // brandが変更された時の挙動
    selectedBrand.addEventListener('change', function(){
        chooseableModel.innerHTML = '';
        chooseableModel.innerHTML = Steps.selectModel();
        Steps.getBattList(chooseableModel.value, inputWattEle.value);
    })

    // model変更時の挙動
    chooseableModel.addEventListener('change', function(){
        Steps.getBattList(chooseableModel.value, inputWattEle.value);
    })

    // power変更時の挙動
    inputWattEle.addEventListener('change', function(){
        Steps.getBattList(chooseableModel.value, inputWattEle.value);
    })
    
}

createBatteryFinder();

