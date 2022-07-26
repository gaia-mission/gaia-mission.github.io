class Site {
    constructor() {
        this.drawerToggle = document.getElementById("DrawerToggle")
        this.navigation = document.getElementById("Navigation")
        this.section    = document.getElementById("Section")
        this.drawer     = document.getElementById("Drawer");
        this.drawerIsActive = false;
    }
    // EVENT
    load() {
        this.scroll();
    }
    scroll() {
        this.updateNavigation();
        this.closeDrawer();
    }
    click(event) {
        this.clickDrawer(event);    
    }

    // DRAWER
    clickDrawer(event) {
        if (!this.clickedElement(this.drawerToggle, event)) {
            if (!this.clickedElement(this.drawer, event)) {
                this.closeDrawer();
            }
        }
    }
    toggleDrawer() {
        if (this.drawerIsActive) {
            this.closeDrawer();
        } else {
            this.openDrawer();
        }
    }
    openDrawer() {
        this.drawerIsActive = true;
        this.drawer.classList.add("ActiveDrawer");
    }
    closeDrawer() {
        this.drawerIsActive = false;
        this.drawer.classList.remove("ActiveDrawer");
    }
    clickedElement(element, event) {
        if (element == event.target) {
            return true;
        }
        for (let child of element.children) {
            if(this.clickedElement(child, event)) {
                return true;
            }
        }
        return false;
    }

    // NAVIGATION
    updateNavigation() {
        var index = Math.round(scrollY / screen.height)
        this.deactivateNavigationNodes();
        this.activateNavigationNode(index);
    }
    deactivateNavigationNodes() {
        for (let child of this.navigation.children) {
            child.classList.remove('active_underline');
        }
    }
    activateNavigationNode(index) {
        this.navigation.children[index].classList.add('active_underline');
    }
}