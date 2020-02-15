import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';

export class Player extends API.InstanceObj implements API.IPlayer {
    private link_animations_ptr = 0x400500;

    private cur_form_addr: number = 0x1ef690;
    private position_addr = 0x3ffeb8;
    private rotation_addr = 0x3ffe6c;

    private col_tunic: number = 0x117d08ff;

    // private current_mask = 0x3fff03; //Current equipped mask
    // private last_coord_ground = 0x400170;

    constructor(emu: IMemory) {
        super(emu, 0x3ffdb0);
    }

    get anim(): Buffer {
        return this.emulator.rdramReadBuffer(this.link_animations_ptr, 0x86);
    }

    set anim(val: Buffer) {
        this.emulator.rdramWriteBuffer(this.link_animations_ptr, val);
    }

    get current_form(): number {
        return this.emulator.rdramRead8(this.cur_form_addr);
    }
    set current_form(val: number) {
        this.emulator.rdramWrite8(this.cur_form_addr, val);
    }

    get position(): Buffer {
        return this.emulator.rdramReadBuffer(this.position_addr, 0x0c);
    }
    set position(val: Buffer) {
        this.emulator.rdramWriteBuffer(this.position_addr, val);
    }
    get pos_x(): number {
        return this.emulator.rdramReadF32(this.position_addr);
    }
    set pos_x(val: number) {
        this.emulator.rdramWriteF32(this.position_addr, val);
    }
    get pos_y(): number {
        return this.emulator.rdramReadF32(this.position_addr + 0x04);
    }
    set pos_y(val: number) {
        this.emulator.rdramWrite32(this.position_addr + 0x04, val);
    }
    get pos_z(): number {
        return this.emulator.rdramReadF32(this.position_addr + 0x08);
    }
    set pos_z(val: number) {
        this.emulator.rdramWriteF32(this.position_addr + 0x08, val);
    }

    get rotation(): Buffer {
        return this.emulator.rdramReadBuffer(this.rotation_addr, 0x06);
    }
    
    set rotation(val: Buffer) {
        this.emulator.rdramWriteBuffer(this.rotation_addr, val);
    }
    get rot_x(): number {
        return this.emulator.rdramReadS16(this.rotation_addr);
    }
    set rot_x(val: number) {
        this.emulator.rdramWrite16(this.rotation_addr, val);
    }
    get rot_y(): number {
        return this.emulator.rdramReadS16(this.rotation_addr + 0x02);
    }
    set rot_y(val: number) {
        this.emulator.rdramWrite16(this.rotation_addr+ 0x02, val);
    }
    get rot_z(): number {
        return this.emulator.rdramReadS16(this.rotation_addr+ 0x04);
    }
    set rot_z(val: number) {
        this.emulator.rdramWrite16(this.rotation_addr+ 0x04, val);
    }

    get tunic_color() : number {
        return this.col_tunic;
    }
    set tunic_color(val: number) {
        this.col_tunic = val;
    }
}
