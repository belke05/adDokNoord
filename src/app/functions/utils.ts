export default class Utils {
  static getDayDetermineOpen(): { dayNumber: number; isOpen: boolean } {
    const date = new Date();
    const dayNumber = date.getDay();
    console.log("number", dayNumber);
    const dayHours = date.getHours();
    let isOpen: boolean;
    if (dayNumber === 1) {
      if (dayHours > 13 && dayHours < 20) {
        isOpen = true;
      } else {
        isOpen = false;
      }
    } else if (dayNumber === 7) {
      if (dayHours < 13 && dayHours > 8) {
        isOpen = true;
      } else {
        isOpen = false;
      }
    } else {
      if (dayHours < 20 && dayHours > 8) {
        isOpen = true;
      } else {
        isOpen = false;
      }
    }
    return { dayNumber, isOpen };
  }
  static doSomethingElse(val: string) {
    return val;
  }
}
