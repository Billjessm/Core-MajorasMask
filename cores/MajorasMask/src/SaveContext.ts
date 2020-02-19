import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import * as SUB from './Sub/Imports';

export class SaveContext extends API.BaseObj implements API.ISaveContext {
    private bank_addr: number = 0x1f054e;
    private have_tatl_addr: number = 0x1ef692;
    private intro_flag_addr: number = 0x1ef675;
    private owl_id_addr: number = 0x1ef67e;
    private player_name_addr: number = 0x1ef69c; //Player name
    private quest_status_addr: number = 0x1ef72c;
    private rupee_amount_addr: number = 0x1ef6aa;
    private skill_level_addr: number = 0x1f057f;
    private start_mask_addr: number = 0x1ef674; //Stores the Mask ID Link is wearing (byte)
    private wallet_addr: number = 0x1ef72a;

    private pictograph_special = 0x1f04ea; //01 = tingle, 04 = deku king, 0A = pirate
    private has_scarecrow_song = 0x1f05d4; //Scarecrow song flag
    private scarecrow_song = 0x1f05d6; //Scarecrow's Song
    private bomber_code = 0x1f066b; //Bomber's code
    private stored_epona_scene_id = 0x1f0670;

    private checksum_addr = 0x1f067a;

    // Abstraction
    cycle_flags: API.IBuffered;
    event_flags: API.IBuffered;
    game_flags: API.IBuffered;
    owl_flags: API.IBuffered;

    equip_slots: API.IEquipSlots;
    item_slots: API.IItemSlots;
    mask_slots: API.IMaskSlots;

    clock: API.IClock;

    dungeon_fairies: API.IDungeon;
    dungeon_items: API.IDungeon;
    dungeon_keys: API.IDungeon;
    health: API.IHealth;
    magic: API.IMagic;    
    map: API.IMap;
    Skulltula_house: API.ISkulltulaHouse;

    constructor(emu: IMemory) {
        super(emu);

        this.cycle_flags = new SUB.CycleFlags(emu);
        this.event_flags = new SUB.EventFlags(emu);
        this.game_flags = new SUB.GameFlags(emu);
        this.owl_flags = new SUB.OwlFlags(emu);

        this.equip_slots = new SUB.EquipSlots(emu);
        this.item_slots = new SUB.ItemSlots(emu);
        this.mask_slots = new SUB.MaskSlots(emu);

        this.clock = new SUB.Clock(emu);
        this.dungeon_fairies = new SUB.Dungeon(emu, 0x1ef744);
        this.dungeon_items = new SUB.Dungeon(emu, 0x1ef73a);
        this.dungeon_keys = new SUB.Dungeon(emu, 0x1ef730);
        this.health = new SUB.Health(emu);
        this.magic = new SUB.Magic(emu);
        this.map = new SUB.Map(emu);
        this.Skulltula_house = new SUB.SkulltulaHouse(emu);
    }

    //Haven't looked and confirmed length of rdramRead for all

    get bank(): number {
        return this.emulator.rdramRead16(this.bank_addr);
    }
    set bank(val: number) {
        this.emulator.rdramWrite16(this.bank_addr, val);
    }

    get have_tatl(): boolean {
        return this.emulator.rdramRead8(this.have_tatl_addr) !== 0;
    }
    set have_tatl(val: boolean) {
        this.emulator.rdramWrite8(this.have_tatl_addr, val ? 1 : 0);
    }

    get intro_flag(): number {
        return this.emulator.rdramRead8(this.intro_flag_addr);
    }
    set intro_flag(val: number) {
        this.emulator.rdramWrite8(this.intro_flag_addr, val);
    }

    get owl_id(): number {
        return this.emulator.rdramRead16(this.owl_id_addr);
    }
    set owl_id(val: number) {
        this.emulator.rdramWrite16(this.owl_id_addr, val);
    }

    get player_name(): number {
        let half1 = this.emulator.rdramRead32(this.player_name_addr + 0x04);
        let half2 = this.emulator.rdramRead32(this.player_name_addr);
        return (half1 << 0x32) & half2;
    }
    set player_name(val: number) {
        let half1 = val >> 0x32;
        let half2 = val & 0x00000000ffffffff;
        this.emulator.rdramWrite32(this.player_name_addr, half2);
        this.emulator.rdramWrite32(this.player_name_addr + 0x04, half1);
    }

    get quest_status(): number {
        let value = this.emulator.rdramRead32(this.quest_status_addr);
        return value & 0x0fffffff;
    }
    set quest_status(val: number) {
        let value = this.emulator.rdramRead32(this.quest_status_addr);
        value = (value & 0xf0000000) | (val & 0x0fffffff);
        this.emulator.rdramWrite32(this.quest_status_addr, val);
    }

    get rupee_amount(): number {
        return this.emulator.rdramRead16(this.rupee_amount_addr);
    }
    set rupee_amount(val: number) {
        this.emulator.rdramWrite16(this.rupee_amount_addr, val);
    }

    get skill_level(): number {
        return this.emulator.rdramRead8(this.skill_level_addr);
    }
    set skill_level(val: number) {
        this.emulator.rdramWrite8(this.skill_level_addr, val);
    }

    get start_mask(): number {
        return this.emulator.rdramRead8(this.start_mask_addr);
    }
    set start_mask(val: number) {
        this.emulator.rdramWrite8(this.start_mask_addr, val);
    }

    get wallet(): number {
        return this.emulator.rdramRead8(this.wallet_addr);
    }
    set wallet(val: number) {
        this.emulator.rdramWrite8(this.wallet_addr, val);
    }

    get_checksum(): number {
        return this.emulator.rdramRead16(this.checksum_addr);
    }
}
