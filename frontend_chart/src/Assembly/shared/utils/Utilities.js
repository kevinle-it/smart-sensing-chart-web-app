import moment from "moment";

//flag: start => get 12:00 am of input date
//flag: end  => get 23:59 of the input date
export const changeDateToUnix = (inputDate, flag = "start") => {
	let result = moment(inputDate).startOf("date").unix();
	if (flag == "end"){
		result = moment(inputDate).endOf("date").unix();
	}
	return result;
}

export const changeStringToDate = (text) => {
	let day = text.substring(0, 2);
	let month = text.substring(3, 5);
	let year = text.substring(6, 10);
	let result = new Date(year, parseInt(month) - 1, day);
	return result;
}

export const findThreeLargest = (array) => {
	let first = 0, second = 0, third = 0;
	for (let i = 0; i < array.length; i++){
		let x = array[i];
		if (x > first){
			third = second;
			second = first;
			first = x;
		} else if (x > second){
			third = second;
			second = x;
		} else if (x > third){
			third = x;
		}
	}
	return [first, second, third];
}

export const countTotal = (array) => {
	let result = array.reduce((total, current) => {
		return total += current;
	})
	return result;
}

export const findLeadTimeCcrProcess = (leadData) => {
	console.log("findLeadTimeCcrProcess");
	console.log("leadData: ", leadData);
	let ccrProcess = {
		min_process_crr      : '', prod_qty_day: 0, prod_time_pair: 0,
		line_balancing_stitch: 0, line_balancing_shoe_make: 0, line_balancing_all: 0,
		pph: 0, rft: 0, eff: 0,
	};
	try {
		let exit = false, i = 0;
		do {
			if (leadData[i].min_process_crr != "") {
				exit       = true;
				ccrProcess = leadData[i];
			}
			i++;
		} while (i < leadData.length && !exit);
	} catch (e) {
		console.log("Error: ", e);
	}
	if (leadData && leadData.length > 0){
		let leadDataItem = leadData[0];
		ccrProcess = {
			...ccrProcess,
			pph: leadDataItem.pph_day_ratio,
			rft: leadDataItem.rft_day_ratio,
			eff: leadDataItem.eff_day_ratio,
		}

	}
	console.log("ccrProcess 76: ", ccrProcess);
	return ccrProcess;
};


export const handleLeadTimeData = (leadData) => {
	/*
	 20102	201	Load-In Material
	 20103	201	Computer Stitching
	 20104	201	Normal Stitching
	 20105	201	Packpart Molding
	 20106	201	Toe Molding
	 20107	201	Strobel
	 20108	201	Lasting
	 20109	201	Heel Lasting
	 20110	201	Heat Chamber
	 20111	201	Negartive Gage
	 20112	201	Cementing
	 20113	201	Attach Sole with Upper
	 20114	201	Chiller
	 20115	201	DeLasting
	 20116	201	Metal Detector
	 20117	201	QIP Defect
	 20118	201	Packing
	 */
	let newLeadDataArray = [
		{
			"mas_cd_nm" : "Normal Stitching",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20104"
		},
		{
			"mas_cd_nm" : "Computer Stitching",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20103"
		},
		{
			"mas_cd_nm" : "Backpack Molding",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20105"
		},
		{
			"mas_cd_nm" : "Toe Molding",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20106"
		},
		{
			"mas_cd_nm" : "Strobel",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20107"
		},
		{
			"mas_cd_nm" : "Lasting",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20108"
		},
		{
			"mas_cd_nm" : "Heal Lasting",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20109"
		},
		{
			"mas_cd_nm" : "Heat Chamber",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20110"
		},
		{
			"mas_cd_nm" : "Negative Gage",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20111"
		},
		{
			"mas_cd_nm" : "Cementing",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20112"
		},
		{
			"mas_cd_nm" : "Attach Sole With Upper",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20113"
		},
		{
			"mas_cd_nm" : "Chiller",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20114"
		},
		{
			"mas_cd_nm" : "Delasting",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20115"
		},
		{
			"mas_cd_nm" : "Metal Detect",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20116"
		},
		{
			"mas_cd_nm" : "QIP Defect",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20117"
		},
		{
			"mas_cd_nm" : "Packing",
			"pair_qty"  : 0,
			"lead_time" : 0,
			"number_of_day" : 0,
			"process_cd": "20118"
		}
	];
	for (let i = 0; i < newLeadDataArray.length; i++) {
		for (let j = 0; j < leadData.length; j++) {
			if (leadData[j].process_cd.toString() === newLeadDataArray[i].process_cd.toString()) {
				newLeadDataArray[i].pair_qty  = leadData[j].pair_qty;
				newLeadDataArray[i].lead_time = leadData[j].lead_time;
				newLeadDataArray[i].number_of_day = leadData[j].number_of_day;
			}
		}
	}
	return newLeadDataArray;
};

export const findLeadTimePerformance = (leadData, ccrProcess) => {
	console.log("findLeadTimePerformance");
	console.log("leadData: ", leadData);
	let maxStitching      = 0, sumStitching = 0;
	let maxShoeMaking    = 0, sumShoeMaking = 0;
	let maxLineBalancing = 0, sumLineBalancing = 0;
	let sumLeadTime         = 0;
	for (let i = 0; i < 2; i++) {
		sumStitching += leadData[i].pair_qty;
		if (maxStitching < leadData[i].pair_qty) {
			maxStitching = leadData[i].pair_qty;
		}
	}
	for (let i = 2; i < leadData.length; i++) {
		sumShoeMaking += leadData[i].pair_qty;
		if (maxShoeMaking < leadData[i].pair_qty) {
			maxShoeMaking = leadData[i].pair_qty;
		}
	}
	for (let i = 0; i < leadData.length; i++) {
		sumLineBalancing += leadData[i].pair_qty;
		sumLeadTime += leadData[i].lead_time;
		if (maxLineBalancing < leadData[i].pair_qty) {
			maxLineBalancing = leadData[i].pair_qty;
		}
	}
	maxStitching               = maxStitching > 0 ? maxStitching : 1;
	maxShoeMaking             = maxShoeMaking > 0 ? maxShoeMaking : 1;
	maxLineBalancing          = maxLineBalancing > 0 ? maxLineBalancing : 1;

	/*let computerStitchingValue  = leadData[1].pair_qty > 0?leadData[1].pair_qty:1;
	 let backpackMoldingValue  = leadData[3].pair_qty?leadData[3].pair_qty:1;
	 let line_balancing_stitch = 0, line_balancing_shoe_make = 0, line_balancing_all = 0;*/
	let line_balancing_all        = sumLineBalancing * 100 / (maxLineBalancing * 16);
	let line_balancing_shoe_make  = sumShoeMaking * 100 / (maxShoeMaking * 14);
	let line_balancing_stitch     = sumStitching * 100 / (maxStitching * 2);

	//count productivity pairs/day, mins/pair
	let packingQty = leadData[15].pair_qty;
	let numberOfWorkingDays = leadData[15].number_of_day > 0?leadData[15].number_of_day:1;
	let productivityPairPerDay = packingQty/numberOfWorkingDays;
	let productivityMinPerPair = sumLeadTime/60;


	ccrProcess                = {
		...ccrProcess,
		line_balancing_all      : line_balancing_all,
		line_balancing_shoe_make: line_balancing_shoe_make,
		line_balancing_stitch   : line_balancing_stitch,
		productivityPairPerDay  : productivityPairPerDay,
		productivityMinPerPair  : productivityMinPerPair
	};
	return ccrProcess;
};

export const findLeadTimeWorkingHour = (leadData) => {
	let workingHourData  = [];
	let workingHourLabel = [];
	for (let i = 0; i < leadData.length; i++) {
		//mas_cd_nm: "Pre. Stitching", pair_qty: 0, lead_time: 0, process_cd: "20101"
		workingHourData.push(leadData[i].lead_time);
		workingHourLabel.push(leadData[i].mas_cd_nm);
	}
	return {
		workingHourData : [{
			backgroundColor: "#2880E9",
			data           : workingHourData
		}],
		workingHourLabel: workingHourLabel
	};
};
