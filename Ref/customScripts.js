$(document).ready(function() {
    var myurl= "http://www.dnd5eapi.co/api/monsters/";
    var monsters;
    $.ajax({
        url : myurl,
        crossDomain: true,
        dataType : "json",
        success : function(parsed_json) {
            monsters = parsed_json['results'];
            var monsterList = "";
            monsters.forEach(function(monster) {
               monsterList += "<p class='listItem' id='" + monster['url'] + "'>" + monster['name'] + "</p>";
            });
            $("#monsters").html(monsterList);
        }
    });

    $("#monsters").on('click', '.listItem', function(){
        var myurl = $(this).attr("id");
        $.ajax({
            url : myurl,
            crossDomain: true,
            dataType : "json",
            success : function(parsed_json) {
                $("#monsters").hide();
                $("body").css("background", "none");
                $("#specialAbilities").empty();
                $("#actions").empty();
                $("#legendaryActions").empty();
                $("#monsterData").show();
                $("#guideText").text("Back").css("text-align","left");
                $("#monsterName").text(parsed_json['name']);
                $("#strength").text("Strength: " + parsed_json['strength']);
                $("#dexterity").text("Dexterity: " + parsed_json['dexterity']);
                $("#constitution").text("Constitution: " + parsed_json['constitution']);
                $("#intelligence").text("Intelligence: " + parsed_json['intelligence']);
                $("#wisdom").text("Wisdom: " + parsed_json['wisdom']);
                $("#charisma").text("Charisma: " + parsed_json['charisma']);
                if("constitution_save" in parsed_json) {
                    $("#constitutionSave").text("Constitution Save: " + parsed_json['constitution_save']);
                }
                if("intelligence_save" in parsed_json) {
                    $("#intelligenceSave").text("Intelligence Save: " + parsed_json['intelligence_save']);
                }
                if("wisdom_save" in parsed_json) {
                    $("#wisdomSave").text("Wisdom Save: " + parsed_json['wisdom_save']);
                }
                $("#size").text("Size: " + parsed_json['size']);
                $("#type").text("Type: " + parsed_json['type'].charAt(0).toUpperCase() + parsed_json['type'].slice(1));
                if(parsed_json['subtype'] !== "") {
                    $("#subType").show().text("Subtype: " + parsed_json['subtype']);
                } else {
                    $("#subType").hide();
                }
                $("#alignment").text("Alignment: " + parsed_json['alignment'].charAt(0).toUpperCase() + parsed_json['alignment'].slice(1));
                $("#armorClass").text("Armor Class: " + parsed_json['armor_class']);
                $("#hitPoints").text("Hit Points (Hit Dice): " + parsed_json['hit_points'] + " (" + parsed_json['hit_dice'] + ")");
                $("#speed").text("Speed: " + parsed_json['speed']);
                $("#senses").text("Senses: " + parsed_json['senses']);
                $("#languages").text("Languages: " + parsed_json['languages']);
                if(parsed_json['special_abilities'].length > 0) {
                    var specialAbilities = "<h3>Special Abilities</h3>";
                    parsed_json['special_abilities'].forEach(function(ability) {
                        specialAbilities += "<div class='row'><p class='name'>Name: " + ability['name'] + "</p><p class='desc'>Description: <br/>" + ability['desc'] + "</p></div>";
                    });
                    $("#specialAbilities").show().html(specialAbilities);
                } else {
                    $("#specialAbilities").html("").hide();
                }

                if(parsed_json['actions'].length > 0) {
                    var actions = "<h3>Actions</h3>";
                    parsed_json['actions'].forEach(function(action) {
                        actions += "<div class='row'><p class='name'>Name: " + action['name'] + "</p><p class='desc'>Description: <br/>" + action['desc'] + "</p>";
                        if("damage_bonus" in action) {
                            actions += "<p class=''>Damage Bonus: " + action['damage_bonus'] + "</p>";
                            actions += "<p class=''>Damage Dice: " + action['damage_dice'] + "</p>";
                            actions += "<p class=''>Attack Bonus: " + action['attack_bonus'] + "</p>";
                        }
                        actions += "</div>"
                    });
                    $("#actions").show().html(actions);
                } else {
                    $("#actions").html("").hide();
                }

                if(parsed_json['legendary_actions'].length > 0) {
                    var legendaryActions = "<h3>Legendary Actions</h3>";
                    parsed_json['legendary_actions'].forEach(function(legAction) {
                        legendaryActions += "<div class='row'><p class='name'>Name: " + legAction['name'] + "</p><p class='desc'>Description: <br/>" + legAction['desc'] + "</p></div>";
                    });
                    $("#legendaryActions").show().html(legendaryActions);
                } else {
                    $("#legendaryActions").html("").hide();
                }
            }
        });
    });

    $("#guideText").click(function(){
        $("#monsters").show();
        $("#monsterData").hide();
        $("#guideText").text("Select a monster to view it.").css("text-align","center");
        $("body").css("background", "url(\"img/D&D Transparent.png\") no-repeat fixed center");
    });
});
