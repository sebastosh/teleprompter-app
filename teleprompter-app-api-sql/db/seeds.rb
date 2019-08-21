# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
speaker1 = Speaker.create(name: "Speaker1", title: "Speaker Title #1")
speaker2 = Speaker.create(name: "Speaker2", title: "Speaker Title #2")
speaker3 = Speaker.create(name: "Speaker3", title: "Speaker Title #3")
speaker4 = Speaker.create(name: "Speaker4", title: "Speaker Title #4")
speaker5 = Speaker.create(name: "Speaker5", title: "Speaker Title #5")

script1 = Script.create(title: "Speach1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum varius sit amet mattis vulputate enim nulla aliquet porttitor. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. ", speaker_id: 1)
script2 = Script.create(title: "Speach2", content: "Cras pulvinar mattis nunc sed blandit libero volutpat sed. Eu volutpat odio facilisis mauris sit amet massa. Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas. Purus faucibus ornare suspendisse sed. ", speaker_id: 1)
script3 = Script.create(title: "Speach3", content: "Dolor purus non enim praesent elementum facilisis leo vel fringilla. Convallis convallis tellus id interdum velit. Sem et tortor consequat id porta nibh venenatis cras. ", speaker_id: 2)
script4 = Script.create(title: "Speach4", content: "Phasellus egestas tellus rutrum tellus pellentesque eu. Viverra aliquet eget sit amet tellus cras. Ultricies leo integer malesuada nunc. ", speaker_id: 2)
script5 = Script.create(title: "Speach5", content: "Consequat mauris nunc congue nisi vitae. Semper risus in hendrerit gravida rutrum quisque. Lacus vestibulum sed arcu non odio euismod lacinia at. Varius sit amet mattis vulputate. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna.", speaker_id: 3)
script6 = Script.create(title: "Speach6", content: "Fusce id velit ut tortor pretium viverra suspendisse. Leo a diam sollicitudin tempor id eu nisl. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius.", speaker_id: 3)
script7 = Script.create(title: "Speach7", content: "Convallis tellus id interdum velit laoreet id donec ultrices. Est pellentesque elit ullamcorper dignissim cras tincidunt. Faucibus purus in massa tempor nec feugiat nisl pretium. ", speaker_id: 4)
script8 = Script.create(title: "Speach8", content: "Dui vivamus arcu felis bibendum ut tristique et egestas. Porta non pulvinar neque laoreet. Vulputate mi sit amet mauris. Nullam eget felis eget nunc lobortis. Porttitor lacus luctus accumsan tortor posuere. Volutpat odio facilisis mauris sit amet massa vitae tortor. ", speaker_id: 4)
script9 = Script.create(title: "Speach9", content: "Vulputate sapien nec sagittis aliquam malesuada bibendum. Varius duis at consectetur lorem donec massa. Tincidunt praesent semper feugiat nibh sed pulvinar. ", speaker_id: 5)
script10 = Script.create(title: "Speach10", content: "Laoreet non curabitur gravida arcu ac tortor dignissim convallis. Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. ", speaker_id: 5)
