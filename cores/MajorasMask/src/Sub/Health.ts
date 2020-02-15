import * as API from '../../API/Imports';

export class Health extends API.BaseObj implements API.IHealth {
    private containers_addr = 0x1ef6a4; //0x10 is equivalent to 1 heart container (int16)
    private double_defense_addr = 0x1ef6b2;
    private hearts_addr = 0x1ef6a6; //0x10 is equivalent to 1 full heart (int16)
    private pieces_addr = 0x1ef72c;

    get containers(): number {
        return this.emulator.rdramRead16(this.containers_addr);
    }
    set containers(value: number) {
        this.emulator.rdramWrite16(this.containers_addr, value);
    }

    get double_defense(): number {
        return this.emulator.rdramRead16(this.double_defense_addr);
    }
    set double_defense(val: number) {
        this.emulator.rdramWrite16(this.double_defense_addr, val);
    }

    get hearts(): number {
        return this.emulator.rdramRead16(this.hearts_addr);
    }
    set hearts(value: number) {
        this.emulator.rdramWrite16(this.hearts_addr, value);
    }

    get pieces(): number {
        let value = this.emulator.rdramRead8(this.pieces_addr);
        return value >> 0x04;
    }
    set pieces(val: number) {
        let value = this.emulator.rdramRead8(this.pieces_addr);
        value = (value & 0x0f) | (val << 0x04);
        this.emulator.rdramWrite8(this.pieces_addr, value);
    }
}
