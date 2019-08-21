class SpeakerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :title, :scripts
  # has_many :scripts
end
