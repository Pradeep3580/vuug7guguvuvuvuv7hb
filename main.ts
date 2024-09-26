let endtime = 0
let starttime = 0
let timing = false
let totaltime = 0
let cost = 0
const COSTPERKWH = 0.18
const WATTS = 1000
const LIGHT_THRESHOLD = 114
const HYSTERESIS = 8
const LIGHT = LIGHT_THRESHOLD + HYSTERESIS / 2
const DARK = LIGHT_THRESHOLD - HYSTERESIS
let reading = 0
let displaying = false

// Function to calculate energy cost
function calccost(minutes: number): number {
    let kw = WATTS / 1000
        let hours = minutes / 60
            let kwh = kw * hours
                cost = kwh * COSTPERKWH
                    return cost
                    }

                    // Display energy cost when button B is pressed
                    input.onButtonPressed(Button.B, function () {
                        displaying = false
                            let minutes = totaltime / 60000 // Convert total time to minutes
                                if (timing) { // If currently timing, add current time to total
                                        minutes += (input.runningTime() - starttime) / 60000
                                            }
                                                basic.clearScreen()
                                                    basic.showNumber(calccost(minutes)) // Show calculated cost
                                                        basic.pause(500)
                                                            displaying = true
                                                            })

                                                            // Alarm function for tilt sensor
                                                            function alarm() {
                                                                basic.showIcon(IconNames.Angry)
                                                                    music.playMelody("B A G A B A G A ", 120) // Simple melody for alarm
                                                                    }

                                                                    // Radio received string for plant tilt alarm
                                                                    radio.onReceivedString(function (receivedString) {
                                                                        alarm()
                                                                        })

                                                                        // Tilt sensor for plant alarm
                                                                        input.onGesture(Gesture.Shake, function () {
                                                                            radio.sendString("thief!")
                                                                                alarm()
                                                                                })

                                                                                radio.setGroup(1)

                                                                                // Light level monitoring for energy timer
                                                                                basic.forever(function () {
                                                                                    reading = input.lightLevel()
                                                                                        if (reading < DARK) {
                                                                                                if (timing) {
                                                                                                            endtime = input.runningTime()
                                                                                                                        totaltime += endtime - starttime
                                                                                                                                    timing = false
                                                                                                                                            }
                                                                                                                                                } else if (reading >= LIGHT) {
                                                                                                                                                        if (!timing) {
                                                                                                                                                                    starttime = input.runningTime()
                                                                                                                                                                                timing = true
                                                                                                                                                                                        }
                                                                                                                                                                                            }
                                                                                                                                                                                                basic.pause(100) // Short pause to avoid rapid looping
                                                                                                                                                                                                })

                                                                                                                                                                                                // Display light intensity when button A is pressed
                                                                                                                                                                                                input.onButtonPressed(Button.A, function () {
                                                                                                                                                                                                    reading = input.lightLevel()
                                                                                                                                                                                                        basic.showNumber(reading) // Show current light intensity
                                                                                                                                                                                                            basic.pause(500)
                                                                                                                                                                                                            })

                                                                                                                                                                                                            // Night light functionality based on ambient light level
                                                                                                                                                                                                            basic.forever(function () {
                                                                                                                                                                                                                if (input.lightLevel() < 100) { // Threshold for night light
                                                                                                                                                                                                                        basic.showLeds(`
                                                                                                                                                                                                                                    # # # # #
                                                                                                                                                                                                                                                # # # # #
                                                                                                                                                                                                                                                            # # # # #
                                                                                                                                                                                                                                                                        # # # # #
                                                                                                                                                                                                                                                                                    # # # # #
                                                                                                                                                                                                                                                                                            `)
                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                        basic.clearScreen()
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                                                                                            
