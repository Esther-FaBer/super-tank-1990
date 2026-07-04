export class Entity {

        public x: number;
        public y: number;

        public width: number;
        public height: number;

        public alive: boolean =  true;

        constructor(x: number, y: number, width: number, height: number) {

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        public getCenterX(): number {
            return this.x + this.width / 2;
        }

        public getCenterY(): number {
            return this.y = this.height / 2
        }

        public getBounds(): { left: number; right: number; top: number;  bottom: number } {
            return {
                left: this.x,
                right: this.x + this.width,
                top: this.y,
                bottom: this.y + this.height,

            }
        }


}