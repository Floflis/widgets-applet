const Applet = imports.ui.applet;
const { AppletSettings } = imports.ui.settings;  // Needed for settings API
const Mainloop = imports.mainloop;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const Lang = imports.lang;
const SignalManager = imports.misc.signalManager;

class FloflisShowWidgetsApplet extends Applet.IconApplet {
    constructor(orientation, panel_height, instance_id) {
        super(orientation, panel_height, instance_id);

        this.settings = new AppletSettings(this, "widgets@floflis", instance_id);

        this.signals = new SignalManager.SignalManager(null);
        this.actor.connect('enter-event', Lang.bind(this, this._on_enter));
        this.actor.connect('leave-event', Lang.bind(this, this._on_leave));
        this.signals.connect(global.stage, 'notify::key-focus', this._on_leave, this);

        this.set_applet_icon_name("cs-desklets");
        this.set_applet_tooltip(_("Click to display the widgets/desklets"));
    }

    on_applet_removed_from_panel() {
        this.signals.disconnectAllSignals();
    }

    on_applet_clicked(event) {
        Main.deskletContainer.toggle();
    }

    toggleShowDesklets() {
        if (!Main.deskletContainer.isModal) {
            Main.deskletContainer.raise();
        }
    }
}

function main(metadata, orientation, panel_height, instance_id) {
    return new FloflisShowWidgetsApplet(orientation, panel_height, instance_id);
}
