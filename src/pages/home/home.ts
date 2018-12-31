import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { PrayerDataProvider } from '../../providers/prayer-data/prayer-data';
import { Http, Headers} from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dataList =[];
  url:string = 'https://sunnah.salahtimer.website/mobileapi.php';
  data:string;
  prayerTime=0;
  year: any;
  fajrIqamahMS;
  thuhrIqamahMS;
  asrIqamahMS;
  maghribIqamahMS;
  ishaIqamahMS;
  jumaaIqamahMS;


 // countDownDate=0;


  constructor(public navCtrl: NavController, public http:Http) {
    //this.ionViewDidLoad();

  }
  ionViewDidLoad(){
    this.loadTimes();
    //this.startTime(this.year);

  }

    loadTimes(){
      this.http.get(this.url)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data.results;
        //return this.year=data.results[0]['year'];
        var currentTimeMS = new Date();
        console.log(currentTimeMS);
       // document.getElementById("test").innerHTML = currentTimeMS+"";
        console.log("thuhr iqamah time ===> "+data.results[0]['thuhrIqamahMS']);
       /*
        
        this.thuhrIqamahMS = data.results[0]['thuhrIqamahMS'];
        
        */
        this.fajrIqamahMS = data.results[0]['fajrIqamahMS'];
        this.thuhrIqamahMS = data.results[0]['thuhrIqamahMS'];
        this.asrIqamahMS = data.results[0]['asrIqamahMS'];
        this.maghribIqamahMS = data.results[0]['maghribIqamahMS'];
        this.ishaIqamahMS = data.results[0]['ishaIqamahMS'];
        this.jumaaIqamahMS = data.results[0]['jumaaIqamahMS'];
        this.startTime(
          this.fajrIqamahMS, 
          this.thuhrIqamahMS,
          this.asrIqamahMS,
          this.maghribIqamahMS,
          this.ishaIqamahMS+3600*3*1000,
          this.jumaaIqamahMS
           );   

        //return this.year= data.results[0]['year'];
        
      },err => {
        console.log(err);
      
      });

    }

    startTime(t1,t2,t3,t4,t5,t6){
      //document.getElementById('yearString').innerHTML = xy;

      //let countDownDate = new Date("Dec 30, 2018 19:50:25").getTime(); // returns in MS
      var countDown;
      var dateJS = new Date();
      var currentTime = dateJS.getTime();
      var nextPrayerArabic="";
      var nextPrayerEnglish="";
      if (t1<currentTime && currentTime < t2) {

        countDown = t2;
        if (dateJS.getDay() == 5) {
          // if it is Friday
          nextPrayerArabic = "الجمعة";
          nextPrayerEnglish = "Jumaa";
        } else {
          nextPrayerArabic = "الظهر";
          nextPrayerEnglish = "Thuhr";
      }
        
      }

      if (t2<currentTime && currentTime<t3) {

        countDown = t3;
        nextPrayerEnglish = "Asr";
        nextPrayerArabic = "العصر";
        
      }
      
      if (t3<currentTime && currentTime<t4) {

        countDown = t4;
        nextPrayerEnglish = "Maghrib";
        nextPrayerArabic = "المغرب";
        
      }
      
      if (t4<currentTime && currentTime<t5) {

        countDown = t5;
        nextPrayerEnglish = "Isha";
        nextPrayerArabic = "العشاء";
        
      }






      document.getElementById("englishTitle").innerHTML = nextPrayerEnglish;
      document.getElementById("arabicTitle").innerHTML = nextPrayerArabic;
      console.log("countdown  ===> "+countDown); 
     // document.getElementById("cd").innerHTML = countDown+'';
          // Update the count down every 1 second
          let x = setInterval(function () {
      
            // Get todays date and time
            let now = new Date().getTime();
      
            // Find the timeDifference between now and the count down date
            let timeDifference =  Math.floor(countDown - now);
            console.log("timeDifference ===> "+timeDifference);
           // document.getElementById("timeDifference").innerHTML = timeDifference+'';
            //document.getElementById("cd").innerHTML = countDown+'';
            //document.getElementById("now").innerHTML = now+'';
            // Time calculations for days, hours, minutes and seconds
            //let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            
            console.log(now, "now", "countDown", countDown, "timeDifference", timeDifference);
            
            //console.log(HomePage.osama);
      
            // Output the result in an element with id="demo"
            document.getElementById("hours").innerHTML = hours+"";
            document.getElementById("minutes").innerHTML = minutes+"";
            document.getElementById("seconds").innerHTML = seconds+"";
            
          // document.getElementById("test").innerHTML = 
           (now+ "now"+ "countDown"+ countDown+ "timeDifference"+ timeDifference);
      
             //document.getElementById("hours-round").innerHTML =  hours + "h " + minutes + "m " + seconds + "s ";
      
            // If the count down is over, write some text 
            if (timeDifference < 0) {
              clearInterval(x);
              document.getElementById("demo").innerHTML = timeDifference+'';
            }
          }, 1000);
      
      }

    
}