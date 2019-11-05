/*
 * Source program for Assignment #1 for CST325 Graphics Programming
 * Written by Yauheniya Nikulyak, Thach Doan,
 * 10/26/2019
 */
/*
 * An "object" representing a 3d vector to make operations simple and concise.
 *
 * Similar to how we work with plain numbers, we will work with vectors as
 * an entity unto itself.  Note the syntax below: var Vector3 = function...
 * This is different than you might be used to in most programming languages.
 * Here, the function is meant to be instantiated rather than called and the
 * instantiation process IS similar to other object oriented languages => new Vector3()
 */

var Vector3 = function (x, y, z) {
    // todo - make sure to set a default value in case x, y, or z is not passed in
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    // Sanity check to prevent accidentally using this as a normal function call
    if (!(this instanceof Vector3)) {
        console.error("Vector3 constructor must be called with the new operator");
    }

    this.set = function (x, y, z) {
        // todo set 'this' object's values to those from x, y, and z
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };

    this.clone = function () {
        return new Vector3(this.x, this.y, this.z);
    };

    this.copy = function (other) {
        // copy the values from other into 'this'
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        return this;
    };

    this.add = function (v) {
        // todo - add v to 'this' vector
        // This SHOULD change the values of this.x, this.y, and this.z
        this.x = this.x + v.x;
        this.y = this.y + v.y;
        this.z = this.z + v.z;
        return this;
    };

    this.subtract = function (v) {
        // todo - subtract v from 'this' vector
        // This SHOULD change the values of this.x, this.y, and this.z
        this.x = this.x - v.x;
        this.y = this.y - v.y;
        this.z = this.z - v.z;
        return this;
    };

    this.negate = function () {
        // multiply 'this' vector by -1
        // This SHOULD change the values of this.x, this.y, and this.z
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    };

    this.multiplyScalar = function (scalar) {
        // multiply 'this' vector by "scalar"
        // This SHOULD change the values of this.x, this.y, and this.z
        this.x = this.x * scalar;
        this.y = this.y * scalar;
        this.z = this.z * scalar;
        return this;
    };

    this.length = function () {
        // todo - return the magnitude (A.K.A. length) of 'this' vector
        // This should NOT change the values of this.x, this.y, and this.z
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };

    this.lengthSqr = function () {
        // todo - return the squared magnitude of this vector ||v||^2
        // This should NOT change the values of this.x, this.y, and this.z
        var len = this.length();
        return len * len;
    };

    this.normalized = function () {
        // todo - return a new vector instance that is a normalized clone of 'this' vector
        // This should NOT change the values of this.x, this.y, and this.z
        var normVector = this.clone();
        var length = normVector.length();
        normVector.x = normVector.x / length;
        normVector.y = normVector.y / length;
        normVector.z = normVector.z / length;
        return normVector; // Should return a new vector that is not this
    };

    this.normalize = function () {
        // todo - Change the components of this vector so that its magnitude will equal 1.
        // This SHOULD change the values of this.x, this.y, and this.z
        var length = this.length();
        this.x = this.x / length;
        this.y = this.y / length;
        this.z = this.z / length;
        return this;
    };

    this.dot = function (other) {
        // todo - return the dot product betweent this vector and "other"
        // This should NOT change the values of this.x, this.y, and this.z
        return this.x * other.x + this.y * other.y + this.z * other.z;
    };

    this.toString = function () {
        return "Vector(" + this.x + ", "
            + this.y + ", "
            + this.z + " :::: length: "
            + this.length() + ")";
    };
};
