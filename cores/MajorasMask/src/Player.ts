import IMemory from 'modloader64_api/IMemory';
import IRomMemory from 'modloader64_api/IRomMemory';
import * as API from '../API/Imports';

export class Player extends API.InstanceObj implements API.IPlayer {
    //subtract this.instance.Link from these values

    private link_animations_ptr = 0x400500;

    private position_addr = 0x3ffeb8;
    private rotation_addr = 0x3ffe6c;

    // private current_mask = 0x3fff03; //Current equipped mask
    // private current_anim = 0x3ffff8; //Current animation ID
    // private current_anim_length = 0x40004;
    // private current_anim_pos = 0x400008;
    // private current_anim_speed = 0x40000c;
    // private get_item = 0x400134;
    // private last_coord_ground = 0x400170;
    // private give_magic_bar = 0x3830dc;

    constructor(emu: IMemory) {
        super(emu, 0x3ffdb0);
    }

    get anim(): Buffer {
        return this.emulator.rdramReadBuffer(this.link_animations_ptr, 0x86);
    }

    set anim(val: Buffer) {
        this.emulator.rdramWriteBuffer(this.link_animations_ptr, val);
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
}
