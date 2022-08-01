class Site {
    constructor() {
        this.fadeContainers = document.getElementsByClassName("containerFade");
        this.drawerToggle = document.getElementById("DrawerToggle");
        this.navigation = document.getElementById("Navigation");
        this.section = document.getElementById("Section");
        this.drawer = document.getElementById("Drawer");
        this.header = document.getElementById("Header");
        
        this.drawerIsActive = false;
        this.dialogIsActive = false;

        this.prevScrollY = scrollY;
        // VALS
        this.THRESHOLD_FADING_ELEMENTS = 0;
        this.THRESHOLD_HEADER_INVIS_BACKGROUND = 75;
    }
    // EVENT
    load() {
        this.scroll();
    }
    scroll() {
        this.updateNavigation();
        this.updateContainers();
        this.updateHeader();
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
        if (this.navigation != null) {
            var index = Math.round(scrollY / screen.height)
            this.deactivateNavigationNodes();
            this.activateNavigationNode(index);
        }
    }
    deactivateNavigationNodes() {
        for (let child of this.navigation.children) {
            child.classList.remove('active_underline');
        }
    }
    activateNavigationNode(index) {
        this.navigation.children[index].classList.add('active_underline');
    }

    // FADING
    updateContainers() {
        for (let element of this.fadeContainers) {
            var elementBound = element.getBoundingClientRect().top;
            var windowBound = window.innerHeight;
            var pixelsInView = elementBound - windowBound;
            this.updateFadeElement(element, pixelsInView);
        }
    }
    updateFadeElement(element, pixelsInView) {
        if (pixelsInView < this.THRESHOLD_FADING_ELEMENTS) {
            element.classList.add("visibleContainer");
        } else {
            element.classList.remove("visibleContainer");
        }
    }

    // CLIPBOARD
    clipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
          /* clipboard successfully set */
        }, function() {
          /* clipboard write failed */
        });
    }

    // HEADER
    updateHeader() {
        if (scrollY > this.THRESHOLD_HEADER_INVIS_BACKGROUND) {
            if (this.prevScrollY < scrollY) {
                this.header.classList.add('noHeader');
                this.header.classList.remove('visBackgroundHeader');
                this.header.classList.remove('inVisBackgroundHeader');
                // remove header entirely
            } else {
                this.header.classList.remove('noHeader');
                this.header.classList.add('visBackgroundHeader');
                this.header.classList.remove('inVisBackgroundHeader');
                // black header background
            }
        } else {
            this.header.classList.remove('noHeader');
            this.header.classList.remove('visBackgroundHeader');
            this.header.classList.add('inVisBackgroundHeader');
            // here the header background is invis
        }
        this.prevScrollY = scrollY;
    }
}