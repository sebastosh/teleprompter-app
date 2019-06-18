class SpeakerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :title
  has_many :scripts
end
