let currentUser;
let isAdmin;
const svgPathsMap = new Map();

svgPathsMap.set("profileUser", "M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z");
svgPathsMap.set("profileAdmin", "M352 128C352 198.7 294.7 256 224 256C153.3 256 96 198.7 96 128C96 57.31 153.3 0 224 0C294.7 0 352 57.31 352 128zM209.1 359.2L176 304H272L238.9 359.2L272.2 483.1L311.7 321.9C388.9 333.9 448 400.7 448 481.3C448 498.2 434.2 512 417.3 512H30.72C13.75 512 0 498.2 0 481.3C0 400.7 59.09 333.9 136.3 321.9L175.8 483.1L209.1 359.2z");
svgPathsMap.set("login", "M160 48C160 21.49 181.5 0 208 0C234.5 0 256 21.49 256 48C256 74.51 234.5 96 208 96C181.5 96 160 74.51 160 48V48zM112.7 205.4C97.41 212.2 85.42 224.6 79.22 240.1L77.71 243.9C71.15 260.3 52.53 268.3 36.12 261.7C19.71 255.1 11.73 236.5 18.29 220.1L19.8 216.3C32.19 185.4 56.18 160.5 86.66 146.9L97.66 142C118.5 132.8 140.1 128 163.7 128C208.3 128 248.5 154.8 265.6 195.9L280.1 232.7L302.3 243.4C318.1 251.3 324.5 270.5 316.6 286.3C308.7 302.1 289.5 308.5 273.7 300.6L247 287.3C236.7 282.1 228.6 273.4 224.2 262.8L214.6 239.8L195.3 305.3L244.8 359.4C250.2 365.3 254.1 372.4 256 380.2L279 472.2C283.3 489.4 272.9 506.8 255.8 511C238.6 515.3 221.2 504.9 216.1 487.8L194.9 399.6L124.3 322.5C109.5 306.4 103.1 283.9 109.6 262.8L126.5 199.3C125.6 199.7 124.6 200.1 123.7 200.5L112.7 205.4zM100.7 344.2L141.4 388.6L126.9 424.8C124.5 430.9 120.9 436.4 116.3 440.9L54.63 502.6C42.13 515.1 21.87 515.1 9.372 502.6C-3.124 490.1-3.124 469.9 9.372 457.4L68.73 398L93.69 335.6C95.84 338.6 98.17 341.4 100.7 344.2H100.7zM630.6 233.4C643.1 245.9 643.1 266.1 630.6 278.6L550.6 358.6C538.1 371.1 517.9 371.1 505.4 358.6C492.9 346.1 492.9 325.9 505.4 313.4L530.7 288H384C366.3 288 352 273.7 352 256C352 238.3 366.3 224 384 224H530.7L505.4 198.6C492.9 186.1 492.9 165.9 505.4 153.4C517.9 140.9 538.1 140.9 550.6 153.4L630.6 233.4z");
svgPathsMap.set("logout", "M160 48C160 21.49 181.5 0 208 0C234.5 0 256 21.49 256 48C256 74.51 234.5 96 208 96C181.5 96 160 74.51 160 48V48zM112.7 205.4C97.41 212.2 85.42 224.6 79.22 240.1L77.71 243.9C71.15 260.3 52.53 268.3 36.12 261.7C19.71 255.1 11.73 236.5 18.29 220.1L19.8 216.3C32.19 185.4 56.18 160.5 86.66 146.9L97.66 142C118.5 132.8 140.1 128 163.7 128C208.3 128 248.5 154.8 265.6 195.9L280.1 232.7L302.3 243.4C318.1 251.3 324.5 270.5 316.6 286.3C308.7 302.1 289.5 308.5 273.7 300.6L247 287.3C236.7 282.1 228.6 273.4 224.2 262.8L214.6 239.8L195.3 305.3L244.8 359.4C250.2 365.3 254.1 372.4 256 380.2L279 472.2C283.3 489.4 272.9 506.8 255.8 511C238.6 515.3 221.2 504.9 216.1 487.8L194.9 399.6L124.3 322.5C109.5 306.4 103.1 283.9 109.6 262.8L126.5 199.3C125.6 199.7 124.6 200.1 123.7 200.5L112.7 205.4zM100.7 344.2L141.4 388.6L126.9 424.8C124.5 430.9 120.9 436.4 116.3 440.9L54.63 502.6C42.13 515.1 21.87 515.1 9.372 502.6C-3.124 490.1-3.124 469.9 9.372 457.4L68.73 398L93.69 335.6C95.84 338.6 98.17 341.4 100.7 344.2H100.7zM361.4 374.6C348.9 362.1 348.9 341.9 361.4 329.4L441.4 249.4C453.9 236.9 474.1 236.9 486.6 249.4C499.1 261.9 499.1 282.1 486.6 294.6L461.3 320H480C533 320 576 277 576 224C576 170.1 533 128 480 128H352C334.3 128 319.1 113.7 319.1 96C319.1 78.33 334.3 64 352 64H480C568.4 64 640 135.6 640 224C640 312.4 568.4 384 480 384H461.3L486.6 409.4C499.1 421.9 499.1 442.1 486.6 454.6C474.1 467.1 453.9 467.1 441.4 454.6L361.4 374.6z");


function updateNavBarIcons() {

    fetch("/api/user/get")
        .then(res => res.json())
        .then(data => {

            currentUser = data.user;
            isAdmin = data.admin;

            if (currentUser != null) {
                //changes profile button appearance

                for (let i = 1; i <= 2; i++) {

                    if (isAdmin) {
                        document.getElementById(`profilePath${i}`).setAttribute("d", svgPathsMap.get("profileAdmin"));
                        //document.querySelector(".profile span").style.color = "orange";
                    } else {
                        document.getElementById(`profilePath${i}`).setAttribute("d", svgPathsMap.get("profileUser"));
                    }

                    document.getElementById(`profileSpan${i}`).textContent = currentUser;
                    document.getElementById(`profileLink${i}`).addEventListener("click", () => {
                        localStorage.setItem("page", "index.html");
                        window.location.href = "profile.html";
                    })
                }
                //changes login button appearance
                document.getElementById("signInSignOutPath").setAttribute("d", svgPathsMap.get("logout"));
                document.querySelector(".signInSignOut span").textContent = "Logout";
                document.querySelector(".signInSignOut").addEventListener("click", () => {
                    fetch("/api/user/logout")
                        .then(() => {
                            window.location.href = 'index.html';
                        })
                })

            } else {

                //changes profile button appearance
                for (let i = 1; i <= 2; i++) {
                    document.getElementById(`profilePath${i}`).setAttribute("d", svgPathsMap.get("profileUser"));
                    document.getElementById(`profileSpan${i}`).textContent = "No user";

                    document.getElementById(`profileLink${i}`).addEventListener("click", () => {
                        alert("You need to login first, in order to change your profile.");
                    })
                }
                //changes login button appearance
                document.getElementById("signInSignOutPath").setAttribute("d", svgPathsMap.get("login"));
                document.querySelector(".signInSignOut span").textContent = "Login";
                document.querySelector(".signInSignOut").addEventListener("click", () => {
                    localStorage.setItem("page", "index.html");
                    window.location.href = 'login.html';
                })
            }

        })
        .catch(e => console.log(e))
}