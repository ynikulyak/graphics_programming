/*
 * Source program for Assignment #1 for CST325 Graphics Programming
 * Written by Yauheniya Nikulyak, Thach Doan,
 * 10/26/2019
 */
/*
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 */

var Sphere = function (center, radius) {
    if (!(this instanceof Sphere)) {
        console.error("Sphere constructor must be called with the new operator");
    }

    if (!(center instanceof Vector3)) {
        console.error("The sphere center must be a Vector3");
    }

    if ((typeof (radius) != 'number')) {
        console.error("The radius must be a Number");
    }


    this.center = center;
    this.radius = radius;

    // todo - make sure center and radius are replaced with default values if and only if they
    // are invalid or undefined (i.e. center should be of type Vector3 & radius should be a Number)
    // - the default center should be the zero vector
    // - the default radius should be 1
    if (!(center instanceof Vector3)) {
        this.center = new Vector3();
    }
    if (typeof (radius) != 'number' || radius <= 0) {
        this.radius = 1;
    }

    this.enableDebug = function () {
        this.debug = true;
    };

    this.disableDebug = function () {
        this.debug = false;
    };

    this.log = function () {
        if (!this.debug) {
            return;
        }
        if (arguments.length === 1) {
            console.log(arguments[0]);
            return;
        }
        var s = arguments[0] + ": ";
        for (var i = 1; i < arguments.length; i++) {
            s += arguments[i] + ', ';
        }
        console.log(s);
    };

    this.raycast = function (ray) {
        // todo determine whether the ray intersects this sphere and where
        // create the vector(s) needed to solve for the coefficients in the
        //    quadratic equation
        var oMinusC = ray.origin.clone().subtract(this.center);
        var oMinusCdot = oMinusC.dot(oMinusC);

        // Quadratic equation coefficients:
        var a = ray.direction.dot(ray.direction);
        var b = 2 * ray.direction.dot(oMinusC);
        var c = oMinusCdot - this.radius * this.radius;

        // An object created from a literal that we will return as our result
        var result = {
            hit: null,      // should be of type Boolean
            point: null,    // should be of type Vector3
            normal: null,   // should be of type Vector3
            distance: null, // should be of type Number (scalar)
        };
        // inside sphere e^2 < r^2, where e is a vector = center - ray.origin
        var e = this.center.clone().subtract(ray.origin);
        var eSquare = e.dot(e);
        if (eSquare < this.radius * this.radius) {
            result.hit = false;
            result.point = null;
            this.log("hit", result.hit);
            return result;
        }

        // calculate the discriminant
        var expression = b * b - 4 * a * c;
        var discriminant;

        // use the discriminant to determine if further computation is necessary
        if (expression < 0) {
            result.hit = false;
            result.point = null;
            this.log("hit", result.hit);
            return result;
        }

        discriminant = Math.sqrt(expression);

        // check 1 point
        if (discriminant === 0) {
            var alpha0 = -b / 2 * a;
            //negative tangent
            if (alpha0 < 0) {
                result.hit = false;
                result.point = null;
                return result;
            } else if (alpha0 > 0) {   // valid tangent
                result.hit = true;
                result.point = ray.origin.clone().add(ray.direction.clone().multiplyScalar(alpha0));
                result.normal = result.point.clone().subtract(this.center).normalize();
                result.distance = result.point.clone().subtract(ray.origin).length();
                return result;
            }
        }

        // check 2 points
        if (discriminant > 0) {
            var alpha1 = (-b - discriminant) / 2 * a;
            var alpha2 = (-b + discriminant) / 2 * a;
            var alpha;
            //invalid intersection
            if (alpha1 < 0 && alpha2 < 0) {
                result.hit = false;
                result.point = null;
                this.log("hit", result.hit);
                return result;
            }
            //valid intersection
            if (alpha1 < alpha2 && alpha1 > 0) {
                alpha = alpha1;
            }
            if (alpha2 < alpha1 && alpha2 > 0) {
                alpha = alpha2;
            }

            result.hit = true;
            var directionMultiplied = ray.direction.clone().multiplyScalar(alpha);
            result.point = ray.origin.clone().add(directionMultiplied);
            result.normal = result.point.clone().subtract(this.center).normalize();
            result.distance = result.point.clone().subtract(ray.origin).length();
            return result;
        }
        return result;
    }
};