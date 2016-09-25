var TitanagonCard = function (id, name, polyID, polyPoints, value, ability) {
    this.id = id;
    this.name = name;
    this.polyID = polyID;
    this.polyPoints = polyPoints;
    this.value = value;
    this.ability = ability;
    this.color = Math.floor(this.id/56);
};

TitanagonCard.array = [
//    Color: 0
    new TitanagonCard(0, "The Ousichor", "0-0-0", "", "0", "vacuous"),
    
    new TitanagonCard(1, "Sover", "3-0-0", "29,4 54,47.3 4,47.3", "1", "dictatorial"),
    new TitanagonCard(2, "Tuck", "3-0-30", "29,4 54,47.3 4,47.3", "1", "focused"),
    new TitanagonCard(3, "Wamb", "3-0-60", "29,4 54,47.3 4,47.3", "1", "voyeuristic"),
    new TitanagonCard(4, "Undiscovered", "3-0-90", "29,4 54,47.3 4,47.3", "1", "unknown"),
    
    new TitanagonCard(5, "Verd", "4-0-0", "4,4 54,4 54,54 4,54", "2", "placid"),
    new TitanagonCard(6, "Kyle", "4-0-30", "4,4 54,4 54,54 4,54", "2", "tantalized"),
    new TitanagonCard(7, "Undiscovered", "4-0-60", "4,4 54,4 54,54 4,54", "2", "unknown"),
    
    new TitanagonCard(8, "Undiscovered", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "unknown"),
    new TitanagonCard(9, "Undiscovered", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    new TitanagonCard(10, "Tobo", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "narcissistic"),
    new TitanagonCard(11, "Undiscovered", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    new TitanagonCard(12, "Undiscovered", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    new TitanagonCard(13, "Spack", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "disgruntled"),
    
    new TitanagonCard(14, "Undiscovered", "4-2-0", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    new TitanagonCard(15, "Undiscovered", "4-2-30", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    new TitanagonCard(16, "Undiscovered", "4-2-60", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    new TitanagonCard(17, "Undiscovered", "4-2-90", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    new TitanagonCard(18, "Undiscovered", "4-2-120", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    new TitanagonCard(19, "Undiscovered", "4-2-150", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    
    new TitanagonCard(20, "Undiscovered", "5-0-0", "4,4 54,4 97.3,29 54,54 4,54", "5", "unknown"),
    new TitanagonCard(21, "Undiscovered", "5-0-30", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(22, "Undiscovered", "5-0-60", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(23, "Undiscovered", "5-0-90", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(24, "Undiscovered", "5-0-120", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(25, "Undiscovered", "5-0-150", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(26, "Undiscovered", "5-0-180", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(27, "Undiscovered", "5-0-210", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(28, "Undiscovered", "5-0-240", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(29, "Undiscovered", "5-0-270", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    new TitanagonCard(30, "Undiscovered", "5-0-300", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    new TitanagonCard(31, "Undiscovered", "5-0-330", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    
    new TitanagonCard(32, "Thou", "6-0-0", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "8", "multiconscious"),
    new TitanagonCard(33, "Undiscovered", "6-0-30", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "9", "unknown"),
    
    new TitanagonCard(34, "Undiscovered", "6-1-0", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    new TitanagonCard(35, "Undiscovered", "6-1-30", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    new TitanagonCard(36, "Undiscovered", "6-1-60", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    new TitanagonCard(37, "Undiscovered", "6-1-90", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    new TitanagonCard(38, "Undiscovered", "6-1-120", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    new TitanagonCard(39, "Undiscovered", "6-1-150", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    
    new TitanagonCard(40, "Undiscovered", "6-2-0", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "10", "unknown"),
    new TitanagonCard(41, "Undiscovered", "6-2-30", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    new TitanagonCard(42, "Undiscovered", "6-2-60", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    new TitanagonCard(43, "Undiscovered", "6-2-90", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    
    new TitanagonCard(44, "Undiscovered", "6-3-0", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "11", "unknown"),
    new TitanagonCard(45, "Undiscovered", "6-3-30", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(46, "Undiscovered", "6-3-60", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(47, "Undiscovered", "6-3-90", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(48, "Undiscovered", "6-3-120", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(49, "Undiscovered", "6-3-150", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "13", "unknown"),
    
    new TitanagonCard(50, "Undiscovered", "6-4-0", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    new TitanagonCard(51, "Undiscovered", "6-4-30", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    new TitanagonCard(52, "Undiscovered", "6-4-60", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    new TitanagonCard(53, "Undiscovered", "6-4-90", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
    new TitanagonCard(54, "Undiscovered", "6-4-120", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
    new TitanagonCard(55, "Undiscovered", "6-4-150", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
    
//    Color: 1
    new TitanagonCard(56, "The Ousichor", "0-0-0", "", "0", "vacuous"),
    
    new TitanagonCard(57, "Sover", "3-0-0", "29,4 54,47.3 4,47.3", "1", "dictatorial"),
    new TitanagonCard(58, "Tuck", "3-0-30", "29,4 54,47.3 4,47.3", "1", "focused"),
    new TitanagonCard(59, "Wamb", "3-0-60", "29,4 54,47.3 4,47.3", "1", "voyeuristic"),
    new TitanagonCard(60, "Undiscovered", "3-0-90", "29,4 54,47.3 4,47.3", "1", "unknown"),
    
    new TitanagonCard(61, "Verd", "4-0-0", "4,4 54,4 54,54 4,54", "2", "placid"),
    new TitanagonCard(62, "Kyle", "4-0-30", "4,4 54,4 54,54 4,54", "2", "tantalized"),
    new TitanagonCard(63, "Undiscovered", "4-0-60", "4,4 54,4 54,54 4,54", "2", "unknown"),
    
    new TitanagonCard(64, "Undiscovered", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "unknown"),
    new TitanagonCard(65, "Undiscovered", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    new TitanagonCard(66, "Tobo", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "narcissistic"),
    new TitanagonCard(67, "Undiscovered", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    new TitanagonCard(68, "Undiscovered", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    new TitanagonCard(69, "Spack", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "disgruntled"),
    
    new TitanagonCard(70, "Undiscovered", "4-2-0", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    new TitanagonCard(71, "Undiscovered", "4-2-30", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    new TitanagonCard(72, "Undiscovered", "4-2-60", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    new TitanagonCard(73, "Undiscovered", "4-2-90", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    new TitanagonCard(74, "Undiscovered", "4-2-120", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    new TitanagonCard(75, "Undiscovered", "4-2-150", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    
    new TitanagonCard(76, "Undiscovered", "5-0-0", "4,4 54,4 97.3,29 54,54 4,54", "5", "unknown"),
    new TitanagonCard(77, "Undiscovered", "5-0-30", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(78, "Undiscovered", "5-0-60", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(79, "Undiscovered", "5-0-90", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(80, "Undiscovered", "5-0-120", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(81, "Undiscovered", "5-0-150", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(82, "Undiscovered", "5-0-180", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(83, "Undiscovered", "5-0-210", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(84, "Undiscovered", "5-0-240", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(85, "Undiscovered", "5-0-270", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    new TitanagonCard(86, "Undiscovered", "5-0-300", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    new TitanagonCard(87, "Undiscovered", "5-0-330", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    
    new TitanagonCard(88, "Thou", "6-0-0", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "8", "multiconscious"),
    new TitanagonCard(89, "Undiscovered", "6-0-30", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "9", "unknown"),
    
    new TitanagonCard(90, "Undiscovered", "6-1-0", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    new TitanagonCard(91, "Undiscovered", "6-1-30", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    new TitanagonCard(92, "Undiscovered", "6-1-60", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    new TitanagonCard(93, "Undiscovered", "6-1-90", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    new TitanagonCard(94, "Undiscovered", "6-1-120", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    new TitanagonCard(95, "Undiscovered", "6-1-150", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    
    new TitanagonCard(96, "Undiscovered", "6-2-0", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "10", "unknown"),
    new TitanagonCard(97, "Undiscovered", "6-2-30", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    new TitanagonCard(98, "Undiscovered", "6-2-60", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    new TitanagonCard(99, "Undiscovered", "6-2-90", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    
    new TitanagonCard(100, "Undiscovered", "6-3-0", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "11", "unknown"),
    new TitanagonCard(101, "Undiscovered", "6-3-30", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(102, "Undiscovered", "6-3-60", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(103, "Undiscovered", "6-3-90", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(104, "Undiscovered", "6-3-120", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(105, "Undiscovered", "6-3-150", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "13", "unknown"),
    
    new TitanagonCard(106, "Undiscovered", "6-4-0", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    new TitanagonCard(107, "Undiscovered", "6-4-30", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    new TitanagonCard(108, "Undiscovered", "6-4-60", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    new TitanagonCard(109, "Undiscovered", "6-4-90", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
    new TitanagonCard(110, "Undiscovered", "6-4-120", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
    new TitanagonCard(111, "Undiscovered", "6-4-150", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
    
//    Color: 2
    new TitanagonCard(112, "The Ousichor", "0-0-0", "", "0", "vacuous"),
    
    new TitanagonCard(113, "Sover", "3-0-0", "29,4 54,47.3 4,47.3", "1", "dictatorial"),
    new TitanagonCard(114, "Tuck", "3-0-30", "29,4 54,47.3 4,47.3", "1", "focused"),
    new TitanagonCard(115, "Wamb", "3-0-60", "29,4 54,47.3 4,47.3", "1", "voyeuristic"),
    new TitanagonCard(116, "Undiscovered", "3-0-90", "29,4 54,47.3 4,47.3", "1", "unknown"),
    
    new TitanagonCard(117, "Verd", "4-0-0", "4,4 54,4 54,54 4,54", "2", "placid"),
    new TitanagonCard(118, "Kyle", "4-0-30", "4,4 54,4 54,54 4,54", "2", "tantalized"),
    new TitanagonCard(119, "Undiscovered", "4-0-60", "4,4 54,4 54,54 4,54", "2", "unknown"),
    
    new TitanagonCard(120, "Undiscovered", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "unknown"),
    new TitanagonCard(121, "Undiscovered", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    new TitanagonCard(122, "Tobo", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "narcissistic"),
    new TitanagonCard(123, "Undiscovered", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    new TitanagonCard(124, "Undiscovered", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    new TitanagonCard(125, "Spack", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "disgruntled"),
    
    new TitanagonCard(126, "Undiscovered", "4-2-0", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    new TitanagonCard(127, "Undiscovered", "4-2-30", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    new TitanagonCard(128, "Undiscovered", "4-2-60", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    new TitanagonCard(129, "Undiscovered", "4-2-90", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    new TitanagonCard(130, "Undiscovered", "4-2-120", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    new TitanagonCard(131, "Undiscovered", "4-2-150", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    
    new TitanagonCard(132, "Undiscovered", "5-0-0", "4,4 54,4 97.3,29 54,54 4,54", "5", "unknown"),
    new TitanagonCard(133, "Undiscovered", "5-0-30", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(134, "Undiscovered", "5-0-60", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(135, "Undiscovered", "5-0-90", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(136, "Undiscovered", "5-0-120", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    new TitanagonCard(137, "Undiscovered", "5-0-150", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(138, "Undiscovered", "5-0-180", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(139, "Undiscovered", "5-0-210", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(140, "Undiscovered", "5-0-240", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    new TitanagonCard(141, "Undiscovered", "5-0-270", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    new TitanagonCard(142, "Undiscovered", "5-0-300", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    new TitanagonCard(143, "Undiscovered", "5-0-330", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    
    new TitanagonCard(144, "Thou", "6-0-0", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "8", "multiconscious"),
    new TitanagonCard(145, "Undiscovered", "6-0-30", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "9", "unknown"),
    
    new TitanagonCard(146, "Undiscovered", "6-1-0", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    new TitanagonCard(147, "Undiscovered", "6-1-30", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    new TitanagonCard(148, "Undiscovered", "6-1-60", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    new TitanagonCard(149, "Undiscovered", "6-1-90", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    new TitanagonCard(150, "Undiscovered", "6-1-120", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    new TitanagonCard(151, "Undiscovered", "6-1-150", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    
    new TitanagonCard(152, "Undiscovered", "6-2-0", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "10", "unknown"),
    new TitanagonCard(153, "Undiscovered", "6-2-30", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    new TitanagonCard(154, "Undiscovered", "6-2-60", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    new TitanagonCard(155, "Undiscovered", "6-2-90", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    
    new TitanagonCard(156, "Undiscovered", "6-3-0", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "11", "unknown"),
    new TitanagonCard(157, "Undiscovered", "6-3-30", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(158, "Undiscovered", "6-3-60", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(159, "Undiscovered", "6-3-90", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(160, "Undiscovered", "6-3-120", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    new TitanagonCard(161, "Undiscovered", "6-3-150", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "13", "unknown"),
    
    new TitanagonCard(162, "Undiscovered", "6-4-0", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    new TitanagonCard(163, "Undiscovered", "6-4-30", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    new TitanagonCard(164, "Undiscovered", "6-4-60", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    new TitanagonCard(165, "Undiscovered", "6-4-90", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
    new TitanagonCard(166, "Undiscovered", "6-4-120", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
    new TitanagonCard(167, "Undiscovered", "6-4-150", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
]

TitanagonCard.getCard = function (id) {
    for (i = 0, len = TitanagonCard.array.length; i < len; i++) {
        if (TitanagonCard.array[i].id == id) {
            return TitanagonCard.array[i];
        }
    }
}

TitanagonCard.deckSize = function () {
    return TitanagonCard.array.length;
}

TitanagonCard.draw = function () {
    // list of ids
    var deck = [];

    // add the standard cards
    for (var i = 0; i < TitanagonCard.array.length; i++) {
        deck.push(i);
    }

    return deck[Math.floor(Math.random() * deck.length)];
}
