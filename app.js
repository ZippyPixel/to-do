Vue.createApp({
    data() {
        return {
            nightMode: false,
            isSortByDate: false,
            isSortByDone: false,
            isSortByPending: false,
            newTask: '',
            tasks: []
        }
    },
    methods: {
        addTask() {
            this.newTask = this.newTask.trim();
            if(this.newTask){
                let date = this.getDateString();
                let time = this.getTimeString();
                this.tasks.push([this.newTask, date, time, 'pending']);
            } else {
                alert("There's nothing to add");
            }
            this.saveLocally(this.tasks);
            this.newTask = '';
        },
        removeTask(index) {
            this.tasks.splice(index, 1);
            this.saveLocally(this.tasks);
        },
        changeStatus(index) {
            if(this.tasks[index][3] == 'pending'){
                this.tasks[index][3] = 'done';
            } else {
                this.tasks[index][3] = 'pending';
            }
            this.saveLocally(this.tasks);
        },
        changeNightMode(){
            this.nightMode = !this.nightMode;
            if(this.nightMode){
                document.body.style.background = '#1D263B';
            } else {
                document.body.style.background = '#ACCBE1';
            }
        },
        saveLocally (tasks){
            localStorage.clear();
            if(!localStorage.tasks){
                localStorage.setItem('tasks', JSON.stringify(tasks))
            } else {
                localStorage.tasks = this.tasks;
            }
            console.log(localStorage.tasks);
        },
        getDateString(){
            const date  = new Date();
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
            let [month, day] = [
                date.getMonth(),
                date.getDate(),
            ];
            month = months[month];
            return (`${day} ${month}`);
        },
        getTimeString() {
            const date  = new Date();
            let [hour, minute,second] = [
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
            ];
            return this.tConvert(`${hour}:${minute}`);
        },
        tConvert (time) {
            // Check correct time format and split into components
            time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
          
            if (time.length > 1) { // If time format correct
              time = time.slice (1);  // Remove full string match value
              time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
              time[0] = +time[0] % 12 || 12; // Adjust hours
            }
            return time.join (''); // return adjusted time or original string
        },
        sortByDate(){
            if(!this.isSortByDate){
                this.isSortByDate = !this.isSortByDate;
                this.isSortByPending = false;
                this.isSortByDone = false;
                this.tasks = JSON.parse(localStorage.getItem('tasks'));
            }
        },
        sortByDone(){
            if(!this.isSortByDone){
                this.isSortByDone = !this.isSortByDone;
                this.isSortByPending = false;
                this.isSortByDate = false;
                let copyTask = [];
                for(let task of this.tasks){
                    let status = task[3];
                    if(status == 'done'){
                        copyTask.push(task);
                    }
                }
                for(let task of this.tasks){
                    let status = task[3];
                    if(status == 'pending'){
                        copyTask.push(task);
                    }
                }
                this.tasks = [...copyTask];
            }
        },
        sortByPending(){
            if(!this.isSortByPending){
                this.isSortByPending = !this.isSortByPending;
                this.isSortByDate = false;
                this.isSortByDone = false;
                let copyTask = [];
                for(let task of this.tasks){
                    let status = task[3];
                    if(status == 'pending'){
                        copyTask.push(task);
                    }
                }
                for(let task of this.tasks){
                    let status = task[3];
                    if(status == 'done'){
                        copyTask.push(task);
                    }
                }
                this.tasks = [...copyTask];
            }
        },
    },
    computed: {
        
    },
    mounted() {
        if (localStorage.tasks) {
            this.tasks = JSON.parse(localStorage.getItem('tasks'));
            console.log(this.tasks);
            console.log(localStorage.tasks);
        }
    },
}).mount('#app')