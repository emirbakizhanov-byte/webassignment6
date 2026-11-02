$(document).ready(function () {
  // Task 0: jQuery setup
  console.log("jQuery is ready!");

  // Task 1: ID, class, and tag selectors; text() and css().
  $("#headline").text("Computer Science Student at Astana IT University");
  $(".hero-description").css("max-width", "430px");
  $("h1").css("letter-spacing", "-5px");

  // Task 1: light / dark theme switch.
  $("#themeToggle").on("click", function () {
    $("body").toggleClass("dark");
    const isDark = $("body").hasClass("dark");
    $(".theme-icon").text(isDark ? "☀" : "☾");
    $(".theme-label").text(isDark ? "Light mode" : "Dark mode");
  });

  // Task 2: visibility methods.
  $("#hideFacts").on("click", function () { $("#funFacts .fact-row").hide(250); });
  $("#showFacts").on("click", function () { $("#funFacts .fact-row").show(250); });
  $("#toggleFacts").on("click", function () { $("#funFacts .fact-row").toggle(250); });

  // Task 3: fade methods for the gallery images.
  $("#fadeOut").on("click", function () { $(".gallery-item img").fadeOut(450); });
  $("#fadeIn").on("click", function () { $(".gallery-item img").fadeIn(450); });
  $("#fadeToggle").on("click", function () { $(".gallery-item img").fadeToggle(450); });

  // Task 4: slide methods for the three favorite panels.
  $(".accordion-trigger").on("click", function () {
    const panel = $(this).next(".accordion-panel");
    const isOpen = $(this).attr("aria-expanded") === "true";
    // Close any other open panel with slideUp().
    $(".accordion-trigger").not(this).attr("aria-expanded", "false").next(".accordion-panel").slideUp(300);
    if (isOpen) {
      panel.slideUp(300);
      $(this).attr("aria-expanded", "false");
    } else {
      panel.slideDown(300);
      $(this).attr("aria-expanded", "true");
    }
  });


  // Task 5: append(), prepend(), and remove() with empty-input validation.
  const initialSkills = ["HTML", "CSS", "JavaScript", "Java"];
  const skillList = $("<ul>", { class: "dynamic-skill-list", "aria-label": "Technical skills" });
  initialSkills.forEach(function (skill) { skillList.append($('<li>').text(skill)); });
  const skillEditor = $("<div>", { class: "skill-editor" });
  const skillInput = $("<input>", { type: "text", placeholder: "Enter a technical skill", "aria-label": "New technical skill" });
  const addButton = $("<button>", { type: "button", class: "mini-button", text: "Add Skill" });
  const prependButton = $("<button>", { type: "button", class: "mini-button", text: "Prepend Skill" });
  const removeButton = $("<button>", { type: "button", class: "mini-button mini-button-accent", text: "Remove Skill" });
  const skillMessage = $("<p>", { class: "skill-message", "aria-live": "polite" });
  skillEditor.append(skillInput, addButton, prependButton, removeButton);
  // Add the interactive DOM-manipulation demo to the skills section.
  $(".skills-list").prepend($('<div class="dynamic-skills"><div class="card-kicker">EDIT MY SKILLS LIST</div></div>').append(skillList, skillEditor, skillMessage));
  function getSkillValue() { return $.trim(skillInput.val()); }
  addButton.on("click", function () {
    const value = getSkillValue();
    if (!value) { skillMessage.text("Please enter a skill first."); return; }
    skillList.append($('<li>').text(value)); skillInput.val(""); skillMessage.text(value + " added to the end of the list.");
  });
  prependButton.on("click", function () {
    const value = getSkillValue();
    if (!value) { skillMessage.text("Please enter a skill first."); return; }
    skillList.prepend($('<li>').text(value)); skillInput.val(""); skillMessage.text(value + " added to the beginning of the list.");
  });
  removeButton.on("click", function () {
    if (skillList.children("li").length === 0) { skillMessage.text("There are no skills to remove."); return; }
    skillList.children("li").last().remove(); skillMessage.text("The last skill was removed.");
  });
  skillInput.on("keydown", function (event) { if (event.key === "Enter") addButton.trigger("click"); });

  // Task 6: change an anchor destination with attr().
  let alternateLink = false;
  $("#changeLink").on("click", function () {
    alternateLink = !alternateLink;
    $("#socialLink").attr("href", alternateLink ? "https://www.linkedin.com/" : "https://github.com/emirbakizhanov-byte");
    $("#socialLink").text(alternateLink ? "LinkedIn website ↗" : "GitHub profile ↗");
    $("#linkStatus").text(alternateLink ? "The destination is now LinkedIn's website." : "Link currently opens my GitHub profile.");
  });

  // Task 7: val() reads form inputs and text() updates the live preview.
  $("#visitorName").on("input", function () {
    const value = $(this).val();
    $("#liveName").text(value ? "Name: " + value : "Your name will appear here.");
  });
  $("#visitorEmail").on("input", function () {
    const value = $(this).val();
    $("#liveEmail").text(value ? "Email: " + value : "Your email will appear here.");
  });
  $("#liveForm").on("submit", function (event) {
    event.preventDefault();
    $("#formFeedback").text("Preview updated. No information was sent or stored.");
  });

  // Task 8: animate skill bars from 0 to their target widths and back.
  let skillsAnimated = false;
  $("#animateSkills").on("click", function () {
    $(".skill-fill").each(function () {
      const targetWidth = skillsAnimated ? "0%" : $(this).closest(".skill-row").data("level") + "%";
      $(this).stop(true).animate({ width: targetWidth }, 850);
    });
    skillsAnimated = !skillsAnimated;
    $(this).html(skillsAnimated ? 'Reset skill bars <span>↻</span>' : 'Animate my skills <span>↗</span>');
  });
});
