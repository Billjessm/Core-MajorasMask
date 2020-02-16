import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import * as SUB from './Sub/Imports';

export class Runtime extends API.BaseObj implements API.IRuntime {
    private b_deku_addr: number = 0x1ef6c8;
    private b_goron_addr: number = 0x1ef6c0;
    private b_human_addr: number = 0x1ef6bc;
    private b_zora_addr: number = 0x1ef6c4;
    private c_left_addr: number = 0x1ef6bd;
    private c_down_addr: number = 0x1ef6be;
    private c_right_addr: number = 0x1ef6bf;
    private c_equipped_addr: number = 0x1ef6cc;
    private cur_scene_addr: number = 0x3e6bc4;
    private cutscene_ptr_addr: number = 0x3e8a48;
    private cutscene_number_addr: number = 0x1ef678; //Cutscene Number, Used to trigger cutscenes. FFF0 - FFFF trigger cutscenes 0-F.
    private entrance_index_addr: number = 0x1ef670;
    private loaded_object_list_addr: number = 0x3fe8b4;
    private scene_frame_addr: number = 0x3FF360;

    private scene_table_ptr = 0x1c3ca0;
    private cur_scene_ptr_addr = 0x3e6da0;
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
    private inventory_quantities = 0x1ef728;

    // Abstraction
    scene_flags: API.IBuffered;

    constructor(emu: IMemory) {
        super(emu);
        this.scene_flags = new SUB.SceneFlags(emu);
    }

    get b_deku(): number {
        return this.emulator.rdramRead8(this.b_deku_addr);
    }
    set b_deku(val: number) {
        this.emulator.rdramWrite8(this.b_deku_addr, val);
    }

    get b_goron(): number {
        return this.emulator.rdramRead8(this.b_goron_addr);
    }
    set b_goron(val: number) {
        this.emulator.rdramWrite8(this.b_goron_addr, val);
    }

    get b_human(): number {
        return this.emulator.rdramRead8(this.b_human_addr);
    }
    set b_human(val: number) {
        this.emulator.rdramWrite8(this.b_human_addr, val);
    }

    get b_zora(): number {
        return this.emulator.rdramRead8(this.b_zora_addr);
    }
    set b_zora(val: number) {
        this.emulator.rdramWrite8(this.b_zora_addr, val);
    }

    get c_left(): API.ItemType {
        return this.emulator.rdramRead8(this.c_left_addr);
    }
    set c_left(val: API.ItemType) {
        this.emulator.rdramWrite8(this.c_left_addr, val);
    }

    get c_down(): API.ItemType {
        return this.emulator.rdramRead8(this.c_down_addr);
    }
    set c_down(val: API.ItemType) {
        this.emulator.rdramWrite8(this.c_down_addr, val);
    }

    get c_right(): API.ItemType {
        return this.emulator.rdramRead8(this.c_right_addr);
    }
    set c_right(val: API.ItemType) {
        this.emulator.rdramWrite8(this.c_right_addr, val);
    }

    get c_left_equipped(): API.ItemType {
        return this.emulator.rdramRead8(this.c_equipped_addr + 0x01);
    }
    set c_left_equipped(val: API.ItemType) {
        this.emulator.rdramWrite8(this.c_equipped_addr + 0x01, val);
    }

    get c_down_equipped(): API.ItemType {
        return this.emulator.rdramRead8(this.c_equipped_addr + 0x02);
    }
    set c_down_equipped(val: API.ItemType) {
        this.emulator.rdramWrite8(this.c_equipped_addr + 0x02, val);
    }

    get c_right_equipped(): API.ItemType {
        return this.emulator.rdramRead8(this.c_equipped_addr + 0x03);
    }
    set c_right_equipped(val: API.ItemType) {
        this.emulator.rdramWrite8(this.c_equipped_addr + 0x03, val);
    }

    get cutscene_number(): number {
        return this.emulator.rdramRead32(this.cutscene_number);
    }
    set cutscene_number(val: number) {
        this.emulator.rdramWrite32(this.cutscene_number_addr, val);
    }

    get cutscene_ptr(): number {
        return this.emulator.rdramRead32(this.cutscene_ptr_addr);
    }

    set cutscene_ptr(val: number) {
        this.emulator.rdramWrite32(this.cutscene_ptr_addr, val);
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

    get_current_scene(): number {
        return this.emulator.rdramRead16(this.cur_scene_addr);
    }

    goto_scene(scene: number) {
        this.emulator.rdramWrite32(0x3ff398, scene);
        this.emulator.rdramWrite8(0x3ff66a, 1);
    }

    loaded_object_list(): number {
        return this.emulator.rdramRead32(this.loaded_object_list_addr);
    }

    is_entering_zone(): boolean {
        return (this.emulator.rdramRead32(0x40081C) & 0x00000001) !== 0;
    }

    is_paused(): boolean {
        return this.emulator.rdramRead32(0x1D1500) !== 0x3;
    }
}
