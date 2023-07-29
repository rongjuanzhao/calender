// pages/calendar.js
Page({
  data: {
    year: 0,
    month: 0,
    days: [],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    markeddates: [],
  },
  onLoad: function () {
    const date = new Date();
    this.setData({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      markedDates: wx.getStorageSync('markedDates') || [],
    });
    this.generateCalendar(date.getFullYear(), date.getMonth() + 1);
  },
  generateCalendar: function (year, month) {
    const days = [];
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      const date = `${year}-${month}-${i}`;
      days.push({
        day: i,
        date: date,
        selected: this.data.markedDates.includes(date),
      });
    }
    this.setData({
      days: days,
    });
  },
  prevMonth: function () {
    const newDate = new Date(this.data.year, this.data.month - 2);
    this.setData({
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
    });
    this.generateCalendar(newDate.getFullYear(), newDate.getMonth() + 1);
  },
  nextMonth: function () {
    const newDate = new Date(this.data.year, this.data.month);
    const newMonth = newDate.getMonth() + 1
    this.setData({
      year: newDate.getFullYear(),
      month: newMonth,
    });
    this.generateCalendar(newDate.getFullYear(), newMonth);
  },
  toggleSelect: function (event) {
    const date = event.currentTarget.dataset.date;
    const days = this.data.days.map(day => {
      if (day.date === date) {
        if (this.data.markedDates.includes(date)) {
          day.selected = false;
          this.setData({
            markedDates: this.data.markedDates.filter(d => d !== date),
          });
        } else {
          day.selected = true;
          this.setData({
            markedDates: [...this.data.markedDates, date],
          });
        }
      }
      return day;
    });
    this.setData({
      days: days,
    });
    wx.setStorageSync('markedDates', this.data.markedDates);
  },
  formatDate: function (timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  },
});
