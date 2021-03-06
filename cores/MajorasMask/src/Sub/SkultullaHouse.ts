import * as API from '../../API/Imports';

export class SkulltulaHouse extends API.BaseObj implements API.ISkulltulaHouse {
  private woodfall_addr = 0x1f0530;
  private greatbay_addr = 0x1f0532;

  get wood_fall(): number {
      return this.emulator.rdramRead16(this.woodfall_addr);
  }
  set wood_fall(val: number) {
      this.emulator.rdramWrite16(this.woodfall_addr, val);
  }

  get great_bay(): number {
      return this.emulator.rdramRead16(this.greatbay_addr);
  }
  set great_bay(val: number) {
      this.emulator.rdramWrite16(this.greatbay_addr, val);
  }
}