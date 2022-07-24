class Site {
    constructor() {
        this.navigation = document.getElementById("Navigation")
        this.section    = document.getElementById("Section")
        this.drawer     = document.getElementById("Drawer");
        this.drawerIsActive = false;
    }
    // EVENT
    load() {
        this.scroll();
        this.loadImages();
    }
    scroll() {
        this.updateNavigation();
        this.closeDrawer();
    }
    click() {
        
    }

    // DRAWER
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

    // IMGS
    loadImages() {
        let images = this.getImages();
        this.setCSSImageValue(images);

    }
    getImages() {
        var images = {};
        for (let node of this.section.children) {
            for (let child of node.children) {
                if (child.tagName === "IMG") {
                    images[node.id] = child;
                }
            }
        }
        return images;
    }
    setCSSImageValue(images) {
        for (let key in images) {
            let CSSVariableName  = `--BdSctn-${key}-Img-lft`;
            let CSSVariableValue = `${images[key].clientWidth}px`;
            document.documentElement.style.setProperty(CSSVariableName, CSSVariableValue);
        }
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