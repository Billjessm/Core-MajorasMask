import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import * as SUB from './Sub/Imports';

export class Runtime extends API.BaseObj implements API.IRuntime {
    private scene_table_ptr = 0x1c3ca0;
    private cur_scene_addr = 0x3e6bc4;
    private cur_scene_ptr_addr = 0x3e6da0;
    private cutscene_ptr_addr = 0x3e8a48;
    private entrance_index_addr: number = 0x1ef670;
    private switch_flags_addr = 0xb5c78;
    private temp_switch_flags_addr = 0x0; //Not found yet
    private chest_flags_addr = 0xb5cb8;
    private room_clear_flags_addr = 0xb5cc4;
    private current_room_num = 0x3ff200;
    private current_room_ptr = 0x3ff20c;
    private frame_count_addr = 0x011de4; //Not found yet
    private scene_frame_count_addr = 0x0;
    private collectable_flag_addr = 0xb5d6c;
    private continue_state_addr = 0x98; //Not found yet
    private epona_ptr = 0x3ffed0;
    private cutscene_number_addr: number = 0x1ef678; //Cutscene Number, Used to trigger cutscenes. FFF0 - FFFF trigger cutscenes 0-F.
    
    private loaded_object_list_addr = 0x3FE8B4;

    private scene_frame_addr = 0x3FF360;

    // Abstraction
    scene_flags: API.IBuffered;

    constructor(emu: IMemory) {
        super(emu);
        this.scene_flags = new SUB.SceneFlags(emu);
    }

    get_current_scene(): number {
        return this.emulator.rdramRead16(this.cur_scene_addr);
    }

    get cutscene_ptr(): number {
        return this.emulator.rdramRead32(this.cutscene_ptr_addr);
    }

    set cutscene_ptr(val: number) {
        this.emulator.rdramWrite32(this.cutscene_ptr_addr, val);
    }

    get cutscene_number(): number {
        return this.emulator.rdramRead32(this.cutscene_number);
    }
    set cutscene_number(val: number) {
        this.emulator.rdramWrite32(this.cutscene_number_addr, val);
    }

    get entrance_index(): number {
        return this.emulator.rdramRead32(this.entrance_index_addr);
    }
    set entrance_index(val: number) {
        this.emulator.rdramWrite32(this.entrance_index_addr, val);
    }

    get scene_frame(): number {
        return this.emulator.rdramRead32(this.scene_frame_addr);
    }

    set scene_frame(val: number) {
        this.emulator.rdramWrite32(this.scene_frame_addr, val);
    }

    get loaded_object_list(): number {
        return this.emulator.rdramRead32(this.loaded_object_list_addr);
    }

    is_entering_zone(): boolean {
        return (this.emulator.rdramRead32(0x40081C) & 0x00000001) !== 0;
    }

    is_paused(): boolean {
        return this.emulator.rdramRead32(0x1D1500) !== 0x3;
    }

    goto_scene(scene: number) {
        this.emulator.rdramWrite32(0x3ff398, scene);
        this.emulator.rdramWrite8(0x3ff66a, 1);
    }
}
