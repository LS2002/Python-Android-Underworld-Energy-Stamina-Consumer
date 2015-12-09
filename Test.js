
/*
STEPS:

1. Connect iPhone 6 to Macbook
2. Create a folder to put in this script
3. Put UE.app to this folder
4. Create a subfolder under this folder, name it "InstrumentResult"
5. Run below command from Terminal, 
   remember to replace "iPhone 6 (8.1 Simulator)" in below command line with your iPhone 6 device name found in Settings->About
   or you can just test it out using the simulator without change

   instruments -w "<UDID>" -t '/Applications/Xcode.app/Contents/Applications/Instruments.app/Contens/PlugIns/AutomationInstrument.xrplugin/Contents/Resources/Automation.tracetemplate' './UE.app' -e UIASCRIPT './Test.js' -e UIARESULTSPATH './InstrumentResult/'

6. To obtain the x,y coordination of the touch, run Instruments->Automation, then select the device and choose target UE.app, press the record button at bottom of Instrument to start recording

*/

var target = UIATarget.localTarget();

target.delay(10);


var DEVICE_TYPE = {
	iPhone6: {
		boss:{
			open:{x:190,y:69},
			boss_list:{x:157,y:461},
			boss_list_yours_second:{x:161.50, y:310.00},

			boss_list_public:{x:254,y:458},
			boss_any:{x:201,y:393},
			opt_in_assassin:{x:267,y:299},
			passport_confirm:{x:130,y:279},

			select_stamina:{x:55,y:559},
			select_40_stamina:{
				drag_from:{x:151,y:471},
				drag_to:{x:135,y:659},
				duration:0.3,
				confirm_40_stamina:{x:95,y:611}
			},

			select_weapon_2nd:{x:325,y:619},

			attack:{x:336,y:378},

			health:{
				open:{x:242,y:66},
				heal:{x:261,y:536}
			},

			refill_fp:{x:167,y:302}
		},

		jobs:{
			open:{x:119,y:71},
			go_to_jobs:{x:167,y:511},
			open_last_job:{x:198,y:398},
			do_job:{x:77,y:623},
			collect:{x:183,y:617},
			reward_dismiss:{x:175,y:319}
		}

	}
};

function touchXY(touchx, touchy, delay){
	target.tap({x:touchx, y:touchy});
	target.delay(delay);
}

function sleep(length){
	target.delay(length);
}

function openBoss(){
	touchXY(selectedDevice.boss.open.x,selectedDevice.boss.open.y, 3);
	touchXY(selectedDevice.boss.boss_list.x,selectedDevice.boss.boss_list.y, 3);
	touchXY(selectedDevice.boss.boss_list_yours_second.x,selectedDevice.boss.boss_list_yours_second.y, 3);
}

function heal(){
	touchXY(selectedDevice.boss.health.open.x,selectedDevice.boss.health.open.y, 2);
	touchXY(selectedDevice.boss.health.heal.x,selectedDevice.boss.health.heal.y, 2);
}

function refillFP(){
	touchXY(selectedDevice.boss.refill_fp.x,selectedDevice.boss.refill_fp.y, 2);
}

function startJobs(){
	touchXY(selectedDevice.jobs.open.x,selectedDevice.jobs.open.y, 2);
	touchXY(selectedDevice.jobs.go_to_jobs.x,selectedDevice.jobs.go_to_jobs.y, 2);
	touchXY(selectedDevice.jobs.open_last_job.x,selectedDevice.jobs.open_last_job.y, 2);

	for(i=0;i<10;i++){
		touchXY(selectedDevice.jobs.do_job.x,selectedDevice.jobs.do_job.y, 2);
	}
	touchXY(selectedDevice.jobs.collect.x,selectedDevice.jobs.collect.y, 2);
	touchXY(selectedDevice.jobs.reward_dismiss.x,selectedDevice.jobs.reward_dismiss.y, 2);
}

function startBossFight(){
	var i = 0;
	var refill_fp_counter = 0;

	openBoss();

	while(i>=0){
		touchXY(selectedDevice.boss.attack.x,selectedDevice.boss.attack.y,1);
		if(i%6==0){
			UIALogger.logMessage("===========heal===============");
			heal();
		}

		if(i%6==0){
			UIALogger.logMessage("===========refill FP===============");
			refillFP();
			refill_fp_counter++;

			if(refill_fp_counter%5==0){ //add stats
				UIALogger.logMessage("============stats=++++============");
				for(k=0;i<5;k++){
					touchXY(selectedDevice.boss.attack.x,selectedDevice.boss.attack.y,0.5);
				}

				UIALogger.logMessage("===========start jobs=============");
				// startJobs();
				UIALogger.logMessage("===========start boss++===========");
				// openBoss();
			}
		}

		UIALogger.logMessage("=============i="+i+"==============");

		sleep(1);
		i++;
	}
}


var selectedDevice = DEVICE_TYPE.iPhone6;

startBossFight();

