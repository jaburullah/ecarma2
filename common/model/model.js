export const DailyItems = [
  {
    name: 'garbageCollection',
    title: 'Garbage Collection',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'corridorSweeping',
    title: 'Corridor Sweeping',
    status: 'Completed',
    review: 'happy',
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'corridorMopping',
    title: 'Corridor Mopping',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'liftFrontWallCleaning',
    title: 'List & Front Wall Cleaning',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  }
];

export const WeeklyItems = [
  {
    name: 'terraceSweeping',
    title: 'Terrace Sweeping',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'electricalRoomCleaning',
    title: 'Electrical Room Cleaning',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'sewer',
    title: 'Sewer',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'electricalPanel',
    title: 'Electrical Panel',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
];

export const MonthlyItems = [
  {
    name: 'buildingDusting',
    title: 'Building Dusting',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'floorScrubbing',
    title: 'Floor Scrubbing',
    status: 'Completed',
    review: 'sad',
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'stpRoomCleaning',
    title: 'STP Room Cleaning',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
];

export const ManagerData = [
  {
    name: 'daily',
    title: 'DAILY',
    ticketCount: '45',
    happyPercent: '60',
    normalPercent: '20',
    sadPercent: '20',
  },
  {
    name: 'weekly',
    title: 'WEEKLY',
    ticketCount: '23',
    happyPercent: '70',
    normalPercent: '20',
    sadPercent: '10',
  },
  {
    name: 'monthly',
    title: 'MONTHLY',
    ticketCount: '12',
    happyPercent: '82',
    normalPercent: '15',
    sadPercent: '03',
  },
];

export const model = m => {
  let _model = m;
  const session = {
    reInitilize: model => {
      _model = model;
    },
    isSecretary: () => {
      return _model.roles.indexOf('secretary') >= 0;
    },
    isManager: () => {
      return _model.roles.indexOf('manager') >= 0;
    },
    login: u => {
      _model = u;
    },
    logout: () => {
      _model = null;
    },

    getUserID: () => {
      return _model.id;
    },

    getUser() {
      return {
        userID: _model.id,
        password: _model.password,
        roles: _model.roles,
        mobileNo: _model.mobileNo,
        apartmentID: _model.apartmentID,
      }
    },
    getApartmentsID: () => {
      return _model.apartmentID;
    },
    setApartments: (d) => {
      _model.apartments = d;
    },
    getApartments: (d) => {
      return _model.apartments;
    },
    setApartmentsTaskInfo: (d) => {
      _model.apartmentsInfo = d;
    },

    getApartmentsTaskInfo: () => _model.apartmentsInfo,

    setApartmentTickets: (d) => {
      _model.apartmentTickets = d;
    },
    getApartmentTickets: (apartmentID) => {
      return _model.apartmentTickets.filter(d => d.apartmentID === apartmentID);
    },

    setApartmentDailyTasks: (d) => {
      _model.apartmentDailyTasks = d;
      _model.dailyTasks = {};
    },
    getApartmentDailyTasks: (apartmentID) => {
      return _model.apartmentDailyTasks.filter(d => d.apartmentID === apartmentID);
    },

    setApartmentWeeklyTasks: (d) => {
      _model.apartmentWeeklyTasks = d;
    },
    getApartmentWeeklyTasks: (apartmentID) => {
      return _model.apartmentWeeklyTasks.filter(d => d.apartmentID === apartmentID);
    },

    setApartmentMonthlyTasks: (d) => {
      _model.apartmentMonthlyTasks = d;
    },
    getApartmentMonthlyTasks: (apartmentID) => {
      return _model.apartmentMonthlyTasks.filter(d => d.apartmentID === apartmentID);
    },

    addTicket: (d) => {
      _model.apartmentTickets.unshift(d);
      this.refresh = true;
    },

    updateDailyTasks: (d) => {

    },
    updateWeeklyTasks: (d) => {

    },
    updateMonthlyTasks: (d) => {

    },
    updateTickets: (d) => {

    }


  };
  return session;
};
