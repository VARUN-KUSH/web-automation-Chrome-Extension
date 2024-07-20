// import { Storage } from "@plasmohq/storage"

// const storage = new Storage()

export const config = {
  matches: ["https://programari.gov.md/en/maeie/appointments*"],
  all_frames: true,
  world: "MAIN"
}

console.log("in formfill")

function generateUniqueIdentifier() {
  return crypto.randomUUID()
}

async function getvalue() {
  console.log("inside form page")
  const data = await storage.get("usersdata")
  console.log(data)
  return data
}

async function clearData() {
  const val = await storage.remove("usersdata")
  console.log(val)
  localStorage.removeItem("usedArrays")
}

async function getUniqueArray() {
  const data = await getvalue()
  // localStorage.setItem('arraysExhausted', 'false');
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error("Invalid or empty data retrieved.")
    return null
  }

  let pageIdentifier = sessionStorage.getItem("pageIdentifier")
  if (!pageIdentifier) {
    pageIdentifier = generateUniqueIdentifier()
    sessionStorage.setItem("pageIdentifier", pageIdentifier)
  }

  let usedArrays = JSON.parse(localStorage.getItem("usedArrays")) || []
  let usedArrays_value =
    JSON.parse(localStorage.getItem("usedArraysValue")) || []

  if (usedArrays.length >= data.length) {
    console.error("No more unique arrays available.")
    localStorage.setItem("arraysExhausted", "true")
    localStorage.removeItem("pageIdentifier")
    sessionStorage.removeItem("pageIdentifier")
    await clearData()

    localStorage.removeItem("uniqueArray")
    window.close()
    alert("all values are filled now start again")

    // return null;
  }

  let uniqueArray = null

  // Find an unused array index
  for (let i = 0; i < data.length; i++) {
    if (!usedArrays.includes(i)) {
      uniqueArray = data[i]
      usedArrays.push(i)
      usedArrays_value.push[data[i]]
      localStorage.setItem("usedArraysValue", JSON.stringify(usedArrays_value))
      localStorage.setItem("usedArrays", JSON.stringify(usedArrays))
      localStorage.setItem(pageIdentifier, JSON.stringify(uniqueArray))
      console.log("Used array index:", i)
      break
    }
  }

  if (!uniqueArray) {
    console.error("No unused array found.")
    return null
  }

  console.log("Used arrays:", usedArrays)
  console.log("Unique array:", uniqueArray)
  return uniqueArray
}

async function finddateandtimeslot(dateValue) {
  setTimeout(() => {
    let cdcontainer = document.querySelector(
      'div[class="cdk-overlay-container"]'
    )
    console.log("cdcontainer", cdcontainer)

    let cdk_overlay = cdcontainer.querySelector('div > div[id="cdk-overlay-0"]')
    console.log("cdk_overlay", cdk_overlay)

    let menu = cdk_overlay.querySelector(
      'div[role="menu"] > div > div[class*="date-time-picker-wrapper"]'
    )
    console.log(menu)

    let scrollbar = menu.querySelector(
      "mat-calendar > div[cdkmonitorsubtreefocus]"
    )
    console.log(scrollbar)

    let table = scrollbar.querySelector('table[role="grid"] > tbody')
    console.log(table)

    let tr = table.querySelectorAll('tr[role="row"]')

    tr.forEach((row) => {
      console.log("repeat")
      let alldates = row.querySelectorAll("td > button")
      console.log("alldates", alldates)
      alldates.forEach((button) => {
        const div = button.querySelector('div[class*="mat-focus-indicator"]')
        console.log(div) // Adjust the selector if necessary
        if (div && div.textContent.trim() == dateValue) {
          console.log(div.textContent)

          button.ariaPressed = "true"
          button.click()
          timeSelect(menu)
          return
        }
      })
    })
  }, 4000)
}

function timeSelect() {
  let scrollbar = menu.querySelector("ng-scrollbar")
  let mwl_calendar_week = scrollbar.querySelector(
    'mwl-calendar-day-view > mwl-calendar-week-view > div[role="grid"]'
  )
  console.log("mwl_calendar_week", mwl_calendar_week)

  mwldroppable = mwl_calendar_week.querySelector(
    'div > div[class="cal-day-columns] > div'
  )
  console.log(mwldroppable)

  let presenthour = mwldroppable.querySelector(
    'div[class*="cal-hour"] > mwl-calendar-week-view-hour-segment > div > div > span[class="badge"]'
  )
  console.log(presenthour)
}

async function waitForDateValue(founddate) {
  return new Promise((resolve, reject) => {
    if (founddate) {
      const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList") {
            let checkdateavail = founddate.querySelector("mat-icon")
            if (checkdateavail) {
              console.log("mat-icon element found:", checkdateavail)
              // Extract the inner text value from founddate
              let dateValue = founddate.innerText.trim()
              console.log("Date value:", dateValue)
              // Optionally disconnect the observer after finding the element
              observer.disconnect()
              //   slotBooked = true // Set slotBooked to true to stop further processing
              resolve(dateValue) // Resolve the promise with the date value
              return
            }
          }
        }
      })

      observer.observe(founddate, {
        childList: true,
        subtree: true
      })
    } else {
      reject("founddate element is not defined")
    }
  })
}

async function fillsandsubmitsvalue() {
  // let pageIdentifier = sessionStorage.getItem('pageIdentifier');

  // if (!pageIdentifier) {
  //   pageIdentifier = generateUniqueIdentifier();
  //   sessionStorage.setItem('pageIdentifier', pageIdentifier);
  // }

  // const val = await getUniqueArray();
  // if (!val) {
  //   alert('fill the values in excel sheet and then retry')
  //   console.error('No unique array found.');
  //   window.close()
  // }

  setTimeout(() => {
    console.log("here inside timeout")

    let main = document.querySelector('main[role="main"]')
    console.log(main)
    let form = main.querySelector("form")

    const script = document.createElement("script")
    script.textContent = `(function() {
        let form = document.querySelector(
    'form')
     form.setAttribute('novalidate', true);
     form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        // Additional logic for handling form submission here if needed
     });
    })()`
    document.body.appendChild(script)

    console.log(form)
    let citizen = form.querySelector(
      'div[class*="eap-card"] > div:nth-child(1)'
    )
    console.log(citizen)
    let checkbox = citizen.querySelector("mat-checkbox > label")
    console.log(checkbox)
    let inputcheckbox = checkbox.querySelector('input[type="checkbox"]')
    console.log(inputcheckbox)
    if (inputcheckbox) {
      inputcheckbox.click()
      //   input.dispatchEvent(new Event("input", { bubbles: true }));
      //   input.dispatchEvent(new Event("checked", { bubbles: true }));
    }

    let AgreeTerms = form.querySelector(
      'label > span > input[id="mat-checkbox-1-input"]'
    )
    console.log(AgreeTerms)
    if (AgreeTerms) {
      AgreeTerms.click()
    }

    let sectioninput = form.querySelectorAll("section")
    console.log(sectioninput)

    sectioninput.forEach((field, index) => {
      console.log(index)
      console.log(field)
      if (index == 0) {
        let names = field.querySelector('div[formgroupname="user"]')
        let numandaddress = field.querySelector('div[class="grouped-fields"]')
        console.log(names)
        console.log(numandaddress)
        let labels = names.querySelectorAll("label")
        let rlabels = numandaddress.querySelectorAll("label")
        labels.forEach((label, index) => {
          if (label) {
            console.log(label.innerText)
            if (label.innerText.includes("First name*")) {
              let input = label.querySelector("input")

              console.log(input)
              input.value = "krishna"
              //   val.Firstname
              input.dispatchEvent(new Event("input", { bubbles: true }))
              input.dispatchEvent(new Event("change", { bubbles: true }))
            } else if (label.innerText.includes("Last name*")) {
              let input = label.querySelector("input")

              console.log(input)
              input.value = "lala"
              //   val.Lastname
              input.dispatchEvent(new Event("input", { bubbles: true }))
              input.dispatchEvent(new Event("change", { bubbles: true }))
            }
          }
        })

        rlabels.forEach((label, index) => {
          if (label) {
            console.log(label.innerText)
            if (label.innerText.includes("Passport number*")) {
              let input = label.querySelector("input")

              console.log(input)
              input.value = "1123456789"
              //   val.Passportnumber
              input.dispatchEvent(new Event("input", { bubbles: true }))
              input.dispatchEvent(new Event("change", { bubbles: true }))
            } else if (label.innerText.includes("Residence address")) {
              let input = label.querySelector("input")

              console.log(input)
              input.value = "matura"
              //   val.Residenceaddress
              input.dispatchEvent(new Event("input", { bubbles: true }))
              input.dispatchEvent(new Event("change", { bubbles: true }))
            }
          }
        })
      }

      if (index == 1) {
        console.log("hy")
        let labels = field.querySelectorAll("label")
        labels.forEach((label, index) => {
          if (label) {
            console.log(label.innerText)
            if (label.innerText.includes("Phone*")) {
              let input = label.querySelector("input")

              console.log(input)
              input.value = "9263744404"
              //   val.phone
              input.dispatchEvent(new Event("input", { bubbles: true }))
              input.dispatchEvent(new Event("change", { bubbles: true }))
            } else if (label.innerText.includes("Email*")) {
              let input = label.querySelector("input")

              console.log(input)
              input.value = "kanha@getMaxListeners.com"
              //   val.email
              input.dispatchEvent(new Event("input", { bubbles: true }))
              input.dispatchEvent(new Event("change", { bubbles: true }))
            }
          }
        })
      }

      if (index == 2) {
        let insidesection = field.querySelector(
          'div[class*="grouped-fields ng-star-inserted"]'
        )
        console.log(insidesection)

        let labels = insidesection.querySelectorAll("label")
        console.log(labels)

        labels.forEach((label, index) => {
          if (index == 0) {
            let ngselect = label.querySelector("ng-select")
            let select = ngselect.querySelector(
              'div > div[class="ng-value-container"]'
            )
            console.log(select)
            let input = select.querySelector('div[role="combobox"] > input')
            console.log(input)
            // let input = select.querySelector('input')
            // console.log(input)
            input.value = "Visa"
            input.focus()

            input.dispatchEvent(new Event("input", { bubbles: true }))
            input.dispatchEvent(new Event("change", { bubbles: true }))

            let enterEvent = new KeyboardEvent("keydown", {
              bubbles: true,
              cancelable: true,
              key: "Enter",
              keyCode: 13
            })
            input.dispatchEvent(enterEvent)
          } else if (index == 1) {
            let dateandtime = label.querySelector(
              'div[class*="mat-form-field-wrapper"]'
            )
            console.log(dateandtime)

            let clickselect = dateandtime.querySelector("div")
            console.log("clickselect", clickselect)
            let click = clickselect.querySelector(
              'div[class*="mat-form-field-infix"]'
            )
            console.log("click", click)
            click.click()

            // document.body.appendChild(script);

            let checkingavail = document.querySelector('div[class="right"]')
            console.log(checkingavail)
            let stickycal = checkingavail.querySelector(
              'div[class*="sticky-calendar"] > eap-services-calendar'
            )
            console.log(stickycal)
            let date = stickycal.querySelector(
              'mwl-calendar-month-view > div[role="grid"] > div[class="cal-days"]'
            )
            console.log(date)
            // let slotBooked = false
            let avail = date.querySelectorAll('div[class="ng-star-inserted"]')
            console.log("avail", avail)
            avail.forEach((daterow) => {
              //   if (slotBooked) return
              let mwl_calendar = daterow.querySelectorAll(
                'div[role="row"] > mwl-calendar-month-cell'
              )
              console.log("mwl_calendar", mwl_calendar)
              mwl_calendar.forEach((calendar) => {
                let founddate = calendar.querySelector(
                  'div > div[class="date"]'
                )
                console.log(founddate)
                let slotBooked = false // Ensure slotBooked is defined outside the function scope

                waitForDateValue(founddate)
                  .then(async (dateValue) => {
                    // performFurtherOperations(dateValue)
                    console.log("here")
                    console.log(dateValue)
                    slotBooked = true
                    await finddateandtimeslot(dateValue)

                    return
                  })
                  .catch((error) => {
                    console.error(error)
                  })

                // if (founddate) {
                //   const observer = new MutationObserver(
                //     (mutationsList, observer) => {
                //       for (let mutation of mutationsList) {
                //         if (slotBooked) return
                //         if (mutation.type === "childList") {
                //           let checkdateavail =
                //             founddate.querySelector("mat-icon")
                //           if (checkdateavail) {
                //             console.log(
                //               "mat-icon element found:",
                //               checkdateavail
                //             )
                //             // Extract the inner text value from founddate
                //             let dateValue = founddate.innerText.trim()
                //             console.log("Date value:", dateValue)
                //             // Optionally disconnect the observer after finding the element
                //             observer.disconnect()
                //             slotBooked = true; // Set slotBooked to true to stop further processing
                //             // break;
                //             // let input = dateandtime.querySelector("input")
                //             // console.log(input)
                //             // const now = new Date()
                //             // console.log(now)
                //             // const year = now.getFullYear()
                //             // const month = (now.getMonth() + 1)
                //             //   .toString()
                //             //   .padStart(2, "0")
                //             // const day = dateValue
                //             // const formattedDate = `${day}.${month}.${year}`

                //             // input.value = formattedDate
                //             // buttonclicked = true
                //             // slotBooked = true

                //             // let button =
                //             //   main.querySelector('div[class="content"] > div[class="left]')
                //             // console.log(button)
                //             // const submit = button.querySelector("button")
                //             // console.log(submit)
                //             // if (submit) {
                //             //   try {
                //             //     submit.click()
                //             //     setTimeout(() => {
                //             //       alert("form filled successfully")
                //             //       window.close()
                //             //     }, 10000)
                //             //     // Programmatically click the submit button
                //             //   } catch (error) {
                //             //     console.log("here inside error")
                //             //     console.error(error)
                //             //     window.close()
                //             //   }
                //             // } else {
                //             //   console.error(
                //             //     "Submit button not found in the form."
                //             //   )
                //             // }
                //             // this code responsible for requesting the Appointment

                //             return
                //           }
                //         }
                //       }
                //     }
                //   )

                //   observer.observe(founddate, {
                //     childList: true,
                //     subtree: true
                //   })
                // }

                // console.log(dateValue)
              })
            })
          }
        })
      }
    })

    console.log("lets submit the form")
  }, 5000)
}

window.addEventListener("load", () => {
  let buttonclicked = false
  fillsandsubmitsvalue()
  setInterval(() => {
    if (buttonclicked) {
      window.location.href = window.location.href
    }
  }, 20000)
})
