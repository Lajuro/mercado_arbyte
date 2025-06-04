class Produto {
    constructor(name, value, imageURL) {
        this.id = Produto.incrementId();
        this.name = name;
        this.value = value;
        this.imageURL = imageURL || './img/placeholder-image.png';
    }

    static incrementId() {
        if (!this.latestId) {
            this.latestId = 1;
        } else {
            this.latestId += 1;
        }

        return this.latestId;
    }
}
