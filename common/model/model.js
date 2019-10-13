export const DailyItems = [
  {
    name: 'garbageCollection',
    title: 'Garbage Collection',
    status: 'Assigned',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'corridorSweeping',
    title: 'Corridor Sweeping',
    status: 'Closed',
    review: 'happy',
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'corridorMopping',
    title: 'Corridor Mopping',
    status: 'Assigned',
    review: 'sad',
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'liftFrontWallCleaning',
    title: 'List & Front Wall Cleaning',
    status: 'Assigned',
    review: 'normal',
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'garbageCollection',
    title: 'Garbage Collection',
    status: 'Assigned',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
];

export const WeeklyItems = [
  {
    name: 'terraceSweeping',
    title: 'Terrace Sweeping',
    status: 'Assigned',
    review: 'normal',
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'electricalRoomCleaning',
    title: 'Electrical Room Cleaning',
    status: 'Assigned',
    review: 'sad',
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'sewer',
    title: 'Sewer',
    status: 'Assigned',
    review: 'happy',
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'electricalPanel',
    title: 'Electrical Panel',
    status: 'Assigned',
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
    status: 'Assigned',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'floorScrubbing',
    title: 'Floor Scrubbing',
    status: 'Closed',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'stpRoomCleaning',
    title: 'STP Room Cleaning',
    status: 'Assigned',
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
    getApartmentID: () => {
      return _model.apartmentID[0];
    }
  };
  return session;
};
