import * as API from '../../API/Imports';

export class Map extends API.BaseObj implements API.IMap {
    private mini_addr = 0x1f0514;
    private visible_addr = 0x1f05d0;
    private visited_addr = 0x1f05cc;

    get mini(): Buffer {
        return this.emulator.rdramReadBuffer(this.mini_addr, 0x1c);
    }
    set mini(val: Buffer) {
        this.emulator.rdramWriteBuffer(this.mini_addr, val);
    }
    
    get visited(): number {
        return this.emulator.rdramRead32(this.visible_addr);
    }
    set visited(val: number) {
        this.emulator.rdramWrite32(this.visible_addr, val);
    }
    
    get visible(): number {
        return this.emulator.rdramRead32(this.visited_addr);
    }
    set visible(val: number) {
        this.emulator.rdramWrite32(this.visited_addr, val);
    }
}
